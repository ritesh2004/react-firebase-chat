import { createContext, useContext, useReducer } from "react";
import { Authcontext } from "./Authcontext";

export const Chatcontext = createContext();

export const Chatprovider = ({children}) =>{

    const {currentUser} = useContext(Authcontext);
    
    const INITIAL_STATE = {
        user:{},
        chatId : "null"
    }

    const ChatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user : action.payload,
                    chatId : currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                };
            default:
                return state;
        }
    }

    const [state,dispatch] = useReducer(ChatReducer,INITIAL_STATE)

    return (
        <Chatcontext.Provider value={{data: state, dispatch}}>{children}</Chatcontext.Provider>
    )
}