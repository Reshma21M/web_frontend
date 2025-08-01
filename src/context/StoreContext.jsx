import { createContext, useContext, useState } from "react";
import { cake_list } from "../components/assets/assets";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

    const {isLoggedIn} = useContext(AppContext)
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate()

    const addToCart = (itemId) => {

        if(!isLoggedIn){
            navigate("/login");
            return;
        }

        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
              let itemInfo = cake_list.find((product)=>product.id === item);
                totalAmount += itemInfo.price* cartItems[item]  
            }
            
        }
        return totalAmount;
    }
    
    const contextValue = {
        cake_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider