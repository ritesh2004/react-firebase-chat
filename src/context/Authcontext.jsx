import { createContext, useEffect, useState } from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../Firebase";

export const Authcontext = createContext();

export const AuthProvider = ({children}) =>{
    const [currentUser,setUser] = useState({});
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setUser(user)
            // console.log(currentUser)
        })

        return ()=>{
            unsub()
        }
    })

    return (
        <Authcontext.Provider value={{currentUser}}>{children}</Authcontext.Provider>
    )
}