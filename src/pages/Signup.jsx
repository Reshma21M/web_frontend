import React from "react"
import './Signup.css'

const Signup = () => {
    return(
        <div className='Signup'>
        <div className="Signup-container">
            <h1>Sign Up</h1>
            <div className="Signup-fields">
            <input type="text" placeholder='Enter Your Name' />
            <input type="email" placeholder='Enter Email Address' />
            <input type="password" placeholder='Enter Your Password' />
            </div>
            <button>Continue</button>
            <p className="Signup-login">Already have an account? <span>Signup here</span></p>
            <div className="Signuplogin-agree">
            <input type="checkbox" name='' id=''/>
            <p>By continuing, I agree to the terms of use & privacy</p>
            </div>
        </div>
        
        </div>
    )
}

export default Signup