import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import { Container } from 'react-bootstrap';
import { Chatcontext } from '../context/Chatcontext';

function ChatNav() {
  const {data} = useContext(Chatcontext);
  return (
    <div className='chatnav'>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar id='chat-app-bar' position="sticky">
        <Toolbar variant="dense">
          <Avatar id='chat-user' src={data.user.photoURL}/>
          <span style={{marginLeft:'10px'}}>{data.user.displayName}</span>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default ChatNav