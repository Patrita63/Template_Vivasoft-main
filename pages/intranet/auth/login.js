import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ParticlesContainer from "/components/ParticlesContainer";
import styles from "./Login.module.css";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress
} from "@mui/material";

import { BsArrowRight } from "react-icons/bs";
import Image from "next/image"; 
import Link from "next/link";
import Cookies from "js-cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

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
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "La password deve avere almeno 8 caratteri, tra cui 1 maiuscola, 1 numero e 1 carattere speciale"
    )
    .required("La password è obbligatoria")
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError: setFormError, // In case we need to set errors manually
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit"
  });

  // 🚀 Check if the form is actually submitting
  const onSubmit = async (data) => {
    console.log("✅ Form Submitted!", data);
    setLoading(true);
    await handleLogin(data);
  };

  const handleLogin = async (loginData) => {
    console.log("🔵 Logging in with:", loginData);
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Errore durante il login");
        return;
      }

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 8);

      Cookies.set("isAuthenticated", "true", { expires: expirationDate, secure: true }); // Expires after 8 hours
      Cookies.set("username", loginData.email, { expires: expirationDate, secure: true });

      // Cookies.set("isAuthenticated", "true", { expires: 1 / 48, secure: true }); // Expires in 30 minutes
      // Cookies.set("username", loginData.email, { expires: 1 / 48, secure: true });

      const greeting = data.user.Gender === "M" ? "Benvenuto" : "Benvenuta";
      // Cookies.set("nominativo", `${greeting} ${data.user.Nome} ${data.user.Cognome}`, { expires: 1 / 48, secure: true });

      Cookies.set("nominativo", `${greeting} ${data.user.Nome} ${data.user.Cognome}`, { expires: expirationDate, secure: true });

      router.push("/intranet");

    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Errore di connessione al server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#2854A3",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2
        }}
      >
        {/* ✅ Make sure particles are NOT blocking interactions */}
        <ParticlesContainer
          className="pointer-events-none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1
          }}
        />

        <Container maxWidth="xs">
          <CssBaseline />
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 w-full mx-auto"
              style={{ marginTop: "-220px", position: "relative", zIndex: 3 }}
            >
              <Box
                sx={{
                  mt: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Image
                  src="/LogoClaim_F.png"
                  alt="Logo Aziendale"
                  width={150}
                  height={150}
                />

                <Typography variant="h5" sx={{ color: "#fff" }}>
                  Login
                </Typography>

                <TextField
                  {...register("email")}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": { color: "#fff" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#fff" },
                      "&:hover fieldset": { borderColor: "#fff" },
                      "&.Mui-focused fieldset": { borderColor: "#fff" }
                    },
                    "& .MuiFormHelperText-root": { color: "#C9C9C9", fontSize: "16px" }
                  }}
                />

                <TextField
                  {...register("password")}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": { color: "#fff" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#fff" },
                      "&:hover fieldset": { borderColor: "#fff" },
                      "&.Mui-focused fieldset": { borderColor: "#fff" }
                    },
                    "& .MuiFormHelperText-root": { color: "#C9C9C9", fontSize: "16px" }
                  }}
                />

                {error && <Typography sx={{ color: "#fff" }}>{error}</Typography>}

                {/* ✅ Debugging: Ensure button works */}
                {/* <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="btn rounded-lg border w-full px-8 transition-all duration-300 flex items-center justify-center"
                  style={{ marginTop: "15px", color: "#fff" }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </button> */}

                {/* Submit Button with Loader */}
                <button
                  type="submit"
                  disabled={!isValid || loading} // Disabled when form is invalid
                  className={`btn rounded-lg border border-navy/100 w-full px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent1 group ${!isValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label="Login"
                  style={{ marginTop: '15px', color: "#fff" }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <>
                      <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">Login</span>
                      <BsArrowRight className="absolute -translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 text-[22px]" />
                    </>
                  )}
                </button>

                <Button className={styles.LoginCancel}
                  fullWidth
                  color="error"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => router.push("/intranet")}
                >
                  Cancel
                </Button>

                <Link className={`${styles.CenterDiv} ${styles.UnderLine}`} href={"/intranet/register"} style={{ color: "#fff", zIndex: 5 }}>
                  Non hai un account? Registrati
                </Link>
              </Box>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
