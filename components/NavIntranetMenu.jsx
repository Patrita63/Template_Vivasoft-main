import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const NavIntranetMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavIntranetMenu;
