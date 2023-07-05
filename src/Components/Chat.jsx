import React from 'react';
import ChatNav from './ChatNav';
import Chatroom from './Chatroom';

function Chat() {
  return (
    <div className='chat'>
        <ChatNav/>
        <Chatroom/>
    </div>
  )
}

export default Chat