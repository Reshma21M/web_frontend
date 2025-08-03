import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextprovider = (props) => {
    axios.defaults.withCredentials = true;

    const backendUrl = process.env.REACT_APP_BACKEND_URL; 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const getUserData = useCallback(async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }, [backendUrl]);

    const getAuthState = useCallback(async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true });
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [backendUrl, getUserData]);

    useEffect(() => {
        getAuthState();
    }, [getAuthState]);

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
