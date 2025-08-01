import React, { useContext, useState } from "react"
import './Navbar.css'
import { assets } from "../assets/assets"
import { StoreContext } from "../../context/StoreContext"
import { Link, useNavigate } from "react-router-dom"
import Login from "../../pages/Login"
import { AppContext } from "../../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const Navbar = () => {
    const [menu, setMenu] = useState("home")
    const {getTotalCartAmount} = useContext(StoreContext)

    const navigate = useNavigate()
    const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContext)

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(`${backendUrl}/api/auth/send-verify-otp`)
            if(data.success){
                navigate('/email-verify')
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    const logout = async () => {
        try {
            axios.defaults.withCredentials = true
            const {data} = await axios.post(`${backendUrl}/api/auth/logout` )
            data.success && setIsLoggedIn(false)
            data.success && setUserData(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return(
        <div className="navbar">
            <Link to='/'><img className='logo' src={assets.logo2} alt="" /></Link>
            <ul className='navbar-menu'>
                <Link onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
                <a href='#menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
                <a href='#app-download' onClick={()=>setMenu("mobile app")} className={menu==="mobile app"?"active":""}>Mobile App</a>
                <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>Contact Us</a>
            </ul>
            <div className='navbar-right'>
                <div className='navbar-search'>
                    <Link to='/cart'>< img src={assets.bascket} alt=""/></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {userData ?
                <div className="profile">
                    {userData.name[0].toUpperCase()}
                    <div className="hover">
                        <ul>
                            {!userData.isAccountVerified && 
                                <li onClick={sendVerificationOtp}>Verify Email</li>
                            }
                            <li onClick={logout}>Logout</li>
                        </ul>
                    </div>
                </div>
                : <button onClick={()=>navigate('/login')}>Sign Up</button>
                }
                    
                
            </div>
        </div>
    )

}

export default Navbar