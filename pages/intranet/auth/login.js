import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
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
import Link from "next/link";

import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleCancel = () => {
    router.push("/intranet");
  };

  const handleLogin = async () => {
    localStorage.setItem("username", email);

    try {
      const response = await fetch('/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Errore durante il login");
        return;
      }

      Cookies.set("isAuthenticated", "true", { expires: 1 / 48, secure: true }); // Expires in 30 minutes
      Cookies.set("username", email, { expires: 1 / 48, secure: true });
      router.push("/intranet");

    } catch (err) {
      console.error("Error during login:", err);
      setError("Errore di connessione al server");
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
            alignItems: "center"
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
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button
              className={styles.LoginCancel}
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              className={styles.Login}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Link
              className={`${styles.CenterDiv} ${styles.UnderLine}`}
              href={"/intranet/register"}
            >
              Non hai un account? Registrati
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
