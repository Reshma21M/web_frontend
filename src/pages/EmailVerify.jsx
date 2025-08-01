import React, { useContext, useEffect } from 'react'
import './EmailVerify.css'
import { assets } from '../components/assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const EmailVerify = () => {

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContext)

  const inputRefs = React.useRef([])


  //function to go forword after type one digit
  const handleInput = (e,index) =>{
    if(e.target.value.length>0 && index<inputRefs.current.length-1){
      inputRefs.current[index+1].focus();
    }
  }
  
  //function to go back when pressed backspace
  const handleKeyDown = (e,index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index>0){
      inputRefs.current[index-1].focus();
    }
  }

  //function to paste the otp that copied from email
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`, {otp})
      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedIn,userData])

  return (
    <div className='email-verify'>
        <img src={assets.logo2} onClick={()=>navigate('/')} alt="" />
        <form onSubmit={onSubmitHandler}>
          <h1>Verify Email</h1>
          <p>Enter the 6-digit code sent to your email</p>
          <div className='input' onPaste={handlePaste}>
            {Array(6).fill(0).map((_,index) => (
              <input type="text" maxLength='1' key={index} required ref={e=>inputRefs.current[index] = e} onInput={(e)=>handleInput(e,index)} onKeyDown={(e)=>handleKeyDown(e,index)}/>
            ))}
          </div>
          <button>Verify Email</button>
        </form>
    </div>
  )
}

export default EmailVerify
