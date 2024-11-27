import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Home.module.css';

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

    // https://nextjs.org/docs/messages/react-hydration-error
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
 
    useEffect(() => {
        // https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
        setIsAuthenticated(global?.localStorage?.getItem("isAuthenticated"));
        setUsername(global?.localStorage?.getItem("username"))
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
                    <Toolbar>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Button color="inherit" className={styles.MarginLeftAuto} onClick={handleHome}>Home</Button>

                        <Stack direction="row" spacing={2}>
                            <Avatar variant="square" { ...stringAvatar('Intranet Vivasoft') } />
                        </Stack>
                        
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
                                <Button  color="inherit" className={styles.MarginLeftAuto} onClick={handleLogin}>Login</Button>
                            </>
                        )}

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Home;
