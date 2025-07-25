import React from "react"
import './Login.css'

const Login = () => {
    return (
        <div className="login">
        <div className="login-container">
            <form >
                <h2>Welcome Back</h2>
                <input type="email" placeholder="Enter Your Email" required/>
                <input type="password" placeholder="Enter Your Password" required />
                <div className="options">
                    <label>
                        <input type="checkbox" />Remember for 30 days
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" className="primary">Sign in</button>
                <button type="button" className="google">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" alt="google icon" className="google-icon" />
                    Sign in with Google
                </button>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </form>
        </div>
        </div>
    );
}

export default Login