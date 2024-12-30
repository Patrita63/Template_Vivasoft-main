// PATRIZIO
// import { Link, useNavigate } from "react-router-dom";

import { useState } from 'react';
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

const Login = () => {

    // To navigate to another page
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // TODO Manage the data from settings
    const urlRootMVCController = "https://localhost:7054/Account/";
    // const urlRootAPI = "https://localhost:7078/api/";
    const urlRootAPI = "https://localhost:44316/api/";

    const handleCancel = () => {
      // Redirect to home page intranet
      router.push("/intranet/home");
    }

    const handleLogin = async () => {

      const formData = new FormData();
      formData.set('Username', email);
      formData.set('Password', password);

      localStorage.setItem("username", email);

      const API_URL = urlRootMVCController + "LoginFromReact";
      console.log(API_URL);
      debugger;

      /* await axios.post(API_URL, formData, {
          headers: {
          "Content-Type": "multipart/form-data"
          }
      })
      .then((response) => {
          if(response.data){
              setIsAuthenticated(response.data);
              console.log(response.data);
              console.log(response.status);
              localStorage.setItem("isAuthenticated", response.data);
      
              // To navigate to another component
              navigate("/");
          }
      })
      .catch((error) => {
          localStorage.clear();
          console.log(error);
      });
      */

      if(email === 'p.tardiolobonifazi@vivasoft.it' || password === 'Paperino'){
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", 'true');
        // alert('Benvenuto ' + email);

        // Redirect to home page intranet
        router.push("/intranet/home");
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