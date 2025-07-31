import React, { useContext } from "react";
import './Header.css'
import { AppContext } from "../../context/AppContext";

const Header = () => {
    const {userData} = useContext(AppContext)
    return(
        <div className="header">
            <div className="header-contents">
                <h2>Hello {userData?userData.name:'Developer'}!</h2>
                <h2>Order Your Favorite Cake</h2>
                <p>Welcome to Cake Shop! Irresistible cakes, freshly baked to delight every celebration and craving</p>
                <button>Order Now</button>
            </div>
        </div>
    )
}

export default Header