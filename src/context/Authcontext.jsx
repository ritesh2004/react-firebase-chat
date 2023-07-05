import { createContext, useEffect, useState } from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../Firebase";

export const Authcontext = createContext();

export const AuthProvider = ({children}) =>{
    const [currentUser,setUser] = useState({});
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setUser(user)
            console.log(currentUser)
        })
    },[])

    return (
        <Authcontext.Provider value={{currentUser}}>{children}</Authcontext.Provider>
    )
}