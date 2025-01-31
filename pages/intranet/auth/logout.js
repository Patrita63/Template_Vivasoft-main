import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Logout.module.css';

import Cookies from "js-cookie";

import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";

const Logout = () => {
  // To navigate to another page
  const router = useRouter();

  const handleCancel = () => {
    // Redirect to home page intranet
    router.push("/intranet");
  }

  const handleLogout = async () => {
    Cookies.remove("isAuthenticated");
    Cookies.remove("username");
    Cookies.remove("nominativo");
    // Redirect to home page intranet
    router.push("/intranet");
  };

  return (
    <>
      <div style={{ backgroundColor: "rgb(149 186 250)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Are you sure to Logout?</Typography>

            <Button className={styles.LogoutCancel}
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button className={styles.Logout}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Container>
      </div>
    </>
  )
}

export default Logout;

