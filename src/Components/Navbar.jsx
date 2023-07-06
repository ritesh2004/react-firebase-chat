import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { Authcontext } from '../context/Authcontext';



function Navbar() {
    const logout = () => {
        console.log("Clicked")
        return signOut(auth)
    }

    const { currentUser } = useContext(Authcontext);
    const [user,setUser] = useState([]);
    // console.log(currentUser)

    useEffect(()=>{
        setUser(currentUser)
    },[currentUser])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <span id='username'>{user.displayName}</span>
                        <Avatar id="profile-img" src={user.photoURL} />
                        <Button id='logoutbtn' variant='contained' onClick={logout} sx={{ position: 'absolute', right: '5px' }}>
                            logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar