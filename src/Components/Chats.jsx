import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Authcontext } from '../context/Authcontext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "../Firebase";
import { Chatcontext } from '../context/Chatcontext';


function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(Authcontext);
  const {dispatch} = useContext(Chatcontext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });

      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats();
  }, [currentUser.uid])
  const arr = Object.entries(chats)
  console.log(arr)
  // console.log(arr[0][1])

  const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER", payload: u})
  }

  return (
    <div>
    {
      <span></span> && Object.entries(chats)?.map((chat) => (
        <div className='chats' key={chat[0]} onClick={()=>handleSelect(chat[1].userinfo)}>
          <Avatar src={chat[1].userinfo.photoURL} />
          <div className="text">
            <span>{chat[1].userinfo.displayName}</span>
            <span style={{
              fontSize: 'smaller', color
                : 'gray'
            }}>{chat[1].lastmessage?chat[1].lastmessage.text:<span></span>}</span>
          </div>
        </div>
      ))
    }
    </div>
  )
}

export default Chats