import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  CircularProgress
} from "@mui/material";

import { BsArrowRight } from 'react-icons/bs';

import { LockOutlined } from "@mui/icons-material";
import Link from "next/link";

import Cookies from "js-cookie";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

// ✅ Validation Schema with Yup
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Inserisci un indirizzo email valido")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Inserisci un'email valida con il formato corretto"
    )
    .required("L’email è obbligatoria"),
  password: yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, "La password deve avere almeno 8 caratteri, tra cui 1 maiuscola, 1 numero e 1 carattere speciale").required('La password è obbligatoria')
});

const Login = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  // To navigate to another page
  const router = useRouter();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange' // Ensures validation updates on user input
  });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading spinner
    console.log('Form Data:', data);

    // API call
    await handleLogin(data);
  };

  const handleCancel = () => {
    router.push("/intranet");
  };

  const handleLogin = async (loginData) => {
    localStorage.setItem("username", loginData.email);
    const email = loginData.email;
    const password = loginData.password;
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
      if (data.user.Gender === 'M') {
        Cookies.set("nominativo", 'Benvenuto ' + data.user.Nome + ' ' + data.user.Cognome, { expires: 1 / 48, secure: true });
      } else {
        Cookies.set("nominativo", 'Benvenuta ' + data.user.Nome + ' ' + data.user.Cognome, { expires: 1 / 48, secure: true });
      }


      router.push("/intranet");

    } catch (err) {
      console.error("Error during login:" + err);
      setError("Errore di connessione al server");
    }
  };

  return (
    <>
    <div style={{ backgroundColor: "rgb(149 186 250)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="xs">
        <CssBaseline />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full mx-auto">
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
            <TextField
              {...register('email')}
              label="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mt: 2 }}
            />

            <TextField
              {...register('password')}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mt: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}

            {/* Submit Button with Loader */}
            <button
              type="submit"
              disabled={!isValid || loading} // Disabled when form is invalid
              className={`btn rounded-lg border border-navy/100 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group ${!isValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Login"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (
                <>
                  <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">Login</span>
                  <BsArrowRight className="absolute -translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 text-[22px]" />
                </>
              )}
            </button>

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

            <Link
              className={`${styles.CenterDiv} ${styles.UnderLine}`}
              href={"/intranet/register"}
            >
              Non hai un account? Registrati
            </Link>
          </Box>

        </form>
      </Container>
    </div>
    </>
  );
};

export default Login;
