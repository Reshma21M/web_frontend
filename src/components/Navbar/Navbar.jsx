import React from "react"
import './Navbar.css'

const Navbar = () => {

    return(
        <div className="navbar">
            <div className="navbar-logo">
                <img src="" className="logo" alt="" />
            </div>
            <ul className="navbar-menu">
                <a href="#home" >Home</a>
                <a href="#explore-menu">Menu</a>
                <a href="#mobile">Mobile App</a>
                <a href="#footer">Contact us</a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-cart">
                    <img src="" className="cart" alt="" />
                </div>
                <button>Login</button>
                
            </div>
        </div>
    )

}

export default Navbar