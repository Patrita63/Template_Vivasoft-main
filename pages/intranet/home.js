import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Home.module.css';

import Image from 'next/image';
import Link from 'next/link';

import {
    AppBar,
    Box,
    Avatar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Stack
  } from "@mui/material";

import { AccountCircle } from '@mui/icons-material';

const Home = () => {
    // To navigate to another page
    const router = useRouter();

    const DATABASE_NAME = 'IntranetVivasoft.sqlite';
    const [db, setDb] = useState(null);
    const [users, setUsers] = useState([]);
    

    // https://nextjs.org/docs/messages/react-hydration-error
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // Initialize IndexedDB-backed SQLite
    useEffect(() => {
        // https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
        setIsAuthenticated(global?.localStorage?.getItem("isAuthenticated"));
        setUsername(global?.localStorage?.getItem("username"));

    }, []);

    const handleHome = () => {
        // Redirect to intranet login page
        router.push("/it-IT");
     }

    const handleLogin = () => {
       // Redirect to intranet login page
       router.push("/intranet/auth/login");
    }

   const handleLogout = () => {
        // Redirect to intranet login page
        router.push("/intranet/auth/logout");
    }

    function stringAvatar(name) {
        return {
        sx: {
            bgcolor: "#1976d2", // stringToColor(name),
            width: 300,
        },
        // children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}${name.split(' ')[2][0]}`
        children: `${name}`
        };
    }

    return ( 
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar className={styles.HomeToolbar}>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 4 }}
                        >
                        </IconButton>
                        {/* Logo azienda */}
                        <div className="flex justify-center items-center">
                            {/* logo */}
                            <Link href={'/'}>
                            <Image 
                                src={'/Logo_VivaSoft.png'}
                                width={85}
                                height={20}
                                alt="Logo Vivasoft S.R.L."
                                priority={true}
                            />
                            </Link>
                        </div>
                        {/* <Button color="inherit" startIcon={svgLogoIcon} className={styles.MarginRightAuto} onClick={handleHome}>Home</Button> */}

                        {/* <Stack direction="row" spacing={2}>
                            <Avatar variant="square" { ...stringAvatar('Intranet Vivasoft') } />
                        </Stack> */}
                        
                        {isAuthenticated && (
                            <>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Welcome {username}
                                </Typography>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                <AccountCircle />
                                </IconButton>
                                <Button color="inherit" className={styles.MarginLeftAuto} onClick={handleLogout}>Logout</Button>
                            </>
                        )}

                        {!isAuthenticated && (
                            <>
                                <div >
                                    <Button  color="inherit" onClick={handleLogin}>Login</Button>
                                </div>
                            </>
                        )}

                    </Toolbar>
                </AppBar>
            </Box>
            
            <div className={styles.Home}>
                <div className='container mx-auto'>
                    <h1 class='slogan'>Tecnologia + Conoscenza = Innovazione.</h1>
                </div>
                {/* <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>

                </div> */}
            </div>
        </>
    );
}

export default Home;
