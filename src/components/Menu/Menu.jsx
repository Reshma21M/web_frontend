import React from "react";
import './Menu.css'
import { menu_list } from "../assets/assets";

const Menu = ({category,setCategory}) => {
    return(
        <div className="menu" id="menu">
            <h1>Explore Our Cakes</h1>
            <p className="menu-text">Indulge in a delightful selection of cakes crafted with love and the finest ingredients. From timeless classics to custom creations, our cakes are made to sweeten every moment and celebration.</p>
            <div className="menu-list">
               {menu_list.map((item,index)=>{
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="menu-list-item">
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}
export default Menu