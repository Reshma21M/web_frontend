import React, { useContext, useState } from "react"
import './Login.css'
import { assets } from "../components/assets/assets"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from 'axios'
import { toast } from "react-toastify"

const Login = () => {

    const navigate = useNavigate()

    const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext)

    const [state, setState] = useState('Log In')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        console.log()
        try{
            e.preventDefault();

            axios.defaults.withCredentials = true

            if(state === 'Sign Up'){
                const {data} = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password })
                if(data.success){
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/')
                }else{
                    toast.error(data.message)
                }
            }else{
                const {data} = await axios.post(`${backendUrl}/api/auth/login`, { email, password })
                if(data.success){
                    setIsLoggedIn(true)
                    await getUserData()
                    if(email === 'thasuniinduma@gmail.com'){
                        navigate('/admin')
                    }else{
                        navigate('/')
                    }
                }else{
                    toast.error(data.message)
                }
            }

        }catch(error){
            toast.error(error.message)
        }
    }

    return (
        <div className="login">
        <div className="login-container">
            <div className="image-container">
                <img src={assets.h2} alt="" />
            </div>
            <form onSubmit={onSubmitHandler}>
                <h2>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</h2>
                {state === 'Sign Up' && (
                    <input type="text" 
                        onChange={e => setName(e.target.value)} 
                        value={name} 
                        name="name" 
                        placeholder="Enter Name" required/>
                )}
                
                    <input type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        placeholder="Enter Your Email" required/>

                    <input type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                        placeholder="Enter Your Password" required />
                <div className="options">
                    
                    <p onClick={() => navigate('/reset-password')}>Forgot Password?</p>
                </div>
                
                    <button type="submit" className="primary">{state}</button>
                
                
                {state === 'Sign Up' ? (
                    <p className="login">
                    Already have an account? <span onClick={() => setState('Log In')} className="text-blue">Login here</span>
                    </p>
                ): (
                    <p>Don't have an account? <span onClick={() => setState('Sign Up')} className="text-blue">Sign Up</span></p>
                )}
            </form>
        </div>
        </div>
    );
}

export default Login