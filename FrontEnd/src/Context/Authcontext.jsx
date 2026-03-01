import  { createContext, useContext, useEffect, useState } from 'react'
 export const Authcontext = createContext({});

//  eslint-disable-next-line react/prop/types

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    //1. Existing user State
    const [user, setUser] = useState(null);

    // 2. NEW: Admin State
    const [admin, setAdmin] = useState(null); 
    // This loading state helps prevent "flickering" on refresh
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // A. Check for Regular User
        const loggedUserJSON = localStorage.getItem("userLogged");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }

        // B. Check for Admin Token
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            // We assume if the token exists, the admin is logged in
            setAdmin(adminToken);
        }
setLoading(false); // Finished checking
    }, []);

    // 3. Helper function to Logout Admin
    const logoutAdmin = () => {
        localStorage.removeItem("adminToken");
        setAdmin(null);
    };

  return (
    // Expose admin, setAdmin, and logoutAdmin to the whole app
    <Authcontext.Provider value={{ user, setUser, admin, setAdmin, logoutAdmin,loading }}>
        {!loading && children}
    </Authcontext.Provider>
  )
};

// eslint-disable-next-line react-refresh/ only-export-components
import React from 'react'

export const useAuthcontext = () => {
    const context = useContext(Authcontext);
    if (context === undefined) {
        throw new Error('useAuthcontext must be used within an AuthProvider')
    }
  return context
};

export default Authcontext



