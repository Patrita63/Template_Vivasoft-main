// PATRIZIO N.B. NO si usa import { useRouter } from 'next/router';
// import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';

import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
// next link
import Link from 'next/link';

import loadDatabase from '../../../lib/databasesqlite';
const localforage = require("localforage");

const Login = () => {

    // To navigate to another page
    const router = useRouter();
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const initializeDatabase = async () => {
          
          try {
              const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
              console.log('Login - databasePath: ' + databasePath);
              const database = await loadDatabase(databasePath);
              setDb(database);
              console.log('database: ' + database);
              // debugger;
          } catch (err) {
              setError(err.message);
              console.log('Login - useEffect error: ' + err.message);
          }
      };

      initializeDatabase();

    }, []);

    const handleCancel = () => {
      // Redirect to home page intranet
      router.push("/intranet");
    }

    const handleLogin = async () => {

      const formData = new FormData();
      formData.set('Username', email);
      formData.set('Password', password);

      localStorage.setItem("username", email);

      if (!db) {
        console.error('Database is not initialized');
        return;
      }

      try {
          
        // Check if the user is already registered
        const checkUser = db.exec(`SELECT * FROM T_Register WHERE Email = '${email}' AND Password = '${password}'`);
        console.log('handleLogin - ' + `SELECT * FROM T_Register WHERE Email = '${email}' AND Password = '${password}'`);

        if (!checkUser || checkUser.length === 0) {
          alert('Utente NON Registrato!!!');
        } else {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", 'true');
  
          // Redirect to home page intranet
          router.push("/intranet");
        }

      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    return (
        <>
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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button className={styles.LoginCancel}
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button className={styles.Login}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            {/* https://stackoverflow.com/questions/38382153/multiple-classnames-with-css-modules-and-react */}
            <Link className={`${styles.CenterDiv} ${styles.UnderLine}`} href={'/intranet/register'}>Non hai un account? Registrati</Link>
              
          </Box>
        </Box>
      </Container>
      </>
    );
};

export default Login;