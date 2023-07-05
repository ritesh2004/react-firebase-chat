import React, { useContext } from 'react'
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
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky" sx={{ padding: '2px' }}>
                    <Toolbar>
                        <span style={{ fontSize: 'large', fontWeight: 'bold', marginRight: '10px' }}>{currentUser.displayName}</span>
                        <Avatar src={currentUser.photoURL} />
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