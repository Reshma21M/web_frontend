import React, { useContext, useState } from 'react'
import './ResetPassword.css'
import { assets } from '../components/assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials= true

  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [isEmailSent, setIsEmailSent] = useState('')
  const[otp, setOtp] = useState(0)
  const [isOtpSubmited, setIsOtpSubmited] = useState(false)

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

    const onSubmitEmail = async(e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(`${backendUrl}/api/auth/send-reset-otp`,{email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setIsEmailSent(true)
      } catch (error) {
        toast.error(error.message)
      }
    }

    const onSubmitOtp = async(e) => {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e=>e.value)
      setOtp(otpArray.join(''))
      setIsOtpSubmited(true)
    }

    const onSubmitNewPassword = async(e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(`${backendUrl}/api/auth/reset-password`,{email, otp,newPassword})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && navigate('/login')
      } catch (error) {
        toast.error(error.message)
      }
    }

  return (
    <div className='reset-pwd'>
      <img src={assets.logo2} onClick={()=>navigate('/')} alt="" />
      {!isEmailSent && 
        <form className='form' onSubmit={onSubmitEmail}>
          <h1>Reset Password</h1>
          <p>Enter your registered email address</p>
          <div className='input'>
            <input type="email" placeholder='Enter Email' value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>
          <button>Submit</button>
        </form>
      }
      {!isOtpSubmited && isEmailSent &&
        <form className='otp' onSubmit={onSubmitOtp}>
          <h1>Reset Password OTP</h1>
          <p>Enter the 6-digit code sent to your email</p>
          <div className='input' onPaste={handlePaste}>
            {Array(6).fill(0).map((_,index) => (
              <input type="text" maxLength='1' key={index} required ref={e=>inputRefs.current[index] = e} onInput={(e)=>handleInput(e,index)} onKeyDown={(e)=>handleKeyDown(e,index)}/>
            ))}
          </div>
          <button>Submit</button>
        </form>
      }
      {isOtpSubmited && isEmailSent && 
        <form className='form' onSubmit={onSubmitNewPassword}>
          <h1>New Password</h1>
          <p>Enter the new password below</p>
          <div className='input'>
            <input type="password" placeholder='Enter new password' value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
          </div>
          <button>Submit</button>
        </form>
      }
    </div>
  )
}

export default ResetPassword
