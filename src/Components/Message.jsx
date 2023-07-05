import React, { useContext, useEffect, useRef } from 'react';
import { Avatar } from '@mui/material';
import { Authcontext } from '../context/Authcontext';
import { Chatcontext } from '../context/Chatcontext';

function Message({message}) {
  const {currentUser} = useContext(Authcontext);
  const {data} = useContext(Chatcontext);

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:'smooth'})
  },[message])

  return (
    <div className='message' ref={ref}>
    <Avatar src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}/>
    <div className='message-text'>
        <span>{message.text}</span>
    </div>
    </div>
  )
}

export default Message