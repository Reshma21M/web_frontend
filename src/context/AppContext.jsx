import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppContextprovider = (props) => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}