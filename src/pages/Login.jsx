import React, { useContext, useState } from "react"
import './Login.css'
import { assets } from "../components/assets/assets"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from 'axios'
import { toast } from "react-toastify"

const Login = () => {

    const navigate = useNavigate()

    const {backendUrl, setIsLoggedIn} = useContext(AppContext)

    const [state, setState] = useState('Sign Up')
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();

            axios.defaults.withCredentials = true

            if(state === 'Sign Up'){
                const {data} = await axios.post(backendUrl + '/api/auth/register', {username, email, password})
                if(data.success){
                    setIsLoggedIn(true)
                    navigate('/')
                }else{
                    toast.error(data.message)
                }
            }else{
                const {data} = await axios.post(`${backendUrl}/api/auth/login`, { email, password })
                if(data.success){
                    setIsLoggedIn(true)
                    navigate('/')
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
            <img src={assets.logo2} onClick={() => navigate('/')} alt="" />
            <form onSubmit={onSubmitHandler}>
                <h2>{state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}</h2>
                {state === 'Sign Up' && (
                    <input type="text" 
                        onChange={e => setName(e.target.value)} 
                        value={username} 
                        name="username" 
                        placeholder="Enter a username" required/>
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