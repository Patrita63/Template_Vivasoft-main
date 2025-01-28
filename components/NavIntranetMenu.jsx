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

import Cookies from "js-cookie";

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
  const [nominativo, setNominativo] = useState('');
  
  const [role, setRole] = useState('');
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

  // Stops Checking When Component Unmounts (clearInterval)
  useEffect(() => {
    const checkAuth = () => {
        const auth = Cookies.get("isAuthenticated") === "true"; // Convert to boolean
        const user = Cookies.get("username");
        const nominativoUtente = Cookies.get("nominativo");
        setIsAuthenticated(auth);
        setUsername(user || "");
        setNominativo(nominativoUtente || "");
    };

    checkAuth(); // Run once when component mounts

    const interval = setInterval(checkAuth, 1000); // Check cookies every second

    return () => clearInterval(interval); // Cleanup on unmount
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
              {nominativo}
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
          <Link href='/intranet' target='_blank' passHref>
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
                Utenti Corsi
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link href="/intranet/allregisteredusers" passHref>
                Utenti Registrati
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
