import React from 'react';
import Navbar from './Navbar';
import Chats from './Chats';
import SearchIcon from '@mui/icons-material/Search';
import Search from './Search';

function Sidebar() {
  return (
    <div className='sidebar'>
    <Navbar/>
    <Search/>
    <Chats/>
    </div>
  )
}

export default Sidebar