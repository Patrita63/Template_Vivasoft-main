import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/router';

import { AccountCircle } from '@mui/icons-material';

import {
  // AppBar,
  // Toolbar,
  // IconButton,
  // MenuIcon,
  // Menu,
  // MenuItem,
  // Typography,
  Button
} from "@mui/material";

const NavIntranetMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // https://nextjs.org/docs/messages/react-hydration-error
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  // To navigate to another page
  const router = useRouter();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
       // Redirect to intranet login page
       router.push("/intranet/auth/login");
  }

  const handleLogout = () => {
        // Redirect to intranet login page
        router.push("/intranet/auth/logout");
  }

  useEffect(() => {
    // https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
    setIsAuthenticated(global?.localStorage?.getItem("isAuthenticated"));
    setUsername(global?.localStorage?.getItem("username"));
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Vivasoft s.r.l.
        </Typography>
                           
        <Link href={'/'}>
          <Image 
              src={'/Logo_VivaSoft.png'}
              width={85}
              height={20}
              alt="Logo Vivasoft S.R.L."
              priority={true}
              style={{ width: '100%', height: 'auto' }}
          />
        </Link>

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
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}

        {!isAuthenticated && (
            <>
                <div >
                    <Button  color="inherit" onClick={handleLogin}>Login</Button>
                </div>
            </>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link href="/" passHref>
              Home web site
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/intranet" passHref>
            Home Intranet Vivasoft
            </Link>
          </MenuItem>
          {isAuthenticated && (
           <>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/intranet/calendar" passHref>
              Calendario Vivasoft
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/intranet/allusers" passHref>
              Utenti ...
            </Link>
          </MenuItem>
          </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavIntranetMenu;
