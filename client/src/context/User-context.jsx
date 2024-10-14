import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        
            const getUser = async () => {
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_BACKEND_AUTH_URL}/auth`
                    );
                    console.log(res.data.rest)
                    if (res.data) {
                        setUser(res.data.rest);
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            };
            getUser();
        
    }, []);

  
    

    return (
        <UserContext.Provider value={{ user,setUser,loading,setLoading }}>
            {children}
        </UserContext.Provider>
    );
};
