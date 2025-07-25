import React, { useContext, useState } from "react"
import './Navbar.css'
import { assets } from "../assets/assets"
import { StoreContext } from "../../context/StoreContext"
import { Link } from "react-router-dom"
import Login from "../../pages/Login"

const Navbar = () => {
    const [menu, setMenu] = useState("home")
    const {getTotalCartAmount} = useContext(StoreContext)

    return(
        <div className="navbar">
            <Link to='/'><img src={assets.logo2} className="logo" alt="" /></Link>
            <ul className="navbar-menu">
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
            <button onClick={() =><Login/>}>Log in</button>
        </div>
        </div>
    )

}

export default Navbar