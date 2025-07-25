import React from "react";
import './Signup.css'

const Signup = () => {
    return(
        <div className="signup">
        <div className="signup-container">
            <form className="signup-form">
                <h2>Create Account</h2>
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter a username" required/>
                <label>Email</label>
                <input type="email" name="email" placeholder="Enter your email" required/>
                <label>Password</label>
                <input type="password" name="password" placeholder="Create a strong password" required/>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm your password" required/>
                <div className="checkbox-container">
                    <label>
                        <input type="checkbox" name="agreed" required />
                        <span>
                            I agree to the <a href="#">Terms of Services</a> and <a href="#">Privacy Policy</a>
                        </span>
                    </label>
                </div>
                <button type="submit">Create Account</button>
                <p className="login">
                    Already have an account? <a href="#">Sign in</a>
                </p>
            </form>
        </div>
        </div>
    );
}

export default Signup