import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './ConfirmedMail.module.css';

import {
    Box,
    Button,
    Container,
    CssBaseline,
    Typography,
    TextField
} from "@mui/material";
// import { LockOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useMemo } from "react";
import Cookies from "js-cookie";

const ConfirmedMail = () => {
    const [loading, setLoading] = useState(false); // Track loading state
    const [codetocheck, setCodetocheck] = useState("");

    const [mailregistration, setMailregistration] = useState('');
    const [coderegistration, setCoderegistration] = useState('');

    const router = useRouter();
    // const { email } = router.query; // Extract the dynamic route parameter

    useEffect(() => {
        const email = Cookies.get("mailregistration");
        const code = Cookies.get("coderegistration");
        // 🔹 Miglioramento con useMemo() (Evita ricalcoli inutili)
        // const email = useMemo(() => Cookies.get("mailregistration") || '', []);
        // const code = useMemo(() => Cookies.get("coderegistration") || '', []);
        setMailregistration(email || '');
        setCoderegistration(code || '');
    }, []);

    const handleChange = (event) => {
        setCodetocheck(event.target.value);
    };

    const handleMailConfirmed = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading spinner

        if (codetocheck === coderegistration && mailregistration !== '') {
            try {
                await handleCheckIfUserIsRegistered(mailregistration, coderegistration);
                setLoading(false); // Stop loading spinner

                // Redirect to the intranet home page
                router.push("/intranet");
            } catch (error) {
                setLoading(false); // Stop loading spinner
                console.error("Verification failed:", error);
                alert("Codice Non Verificato. Controlla la mail che ti abbia inviato.");
            }
        } else {
            setLoading(false); // Stop loading spinner
            alert("Codice Non Verificato. Controlla la mail che ti abbia inviato.");
        }
    };

    const handleCheckIfUserIsRegistered = async (email, code) => {
        if (!email || !code) {
            console.error("Missing email or code for verification");
            alert("Please fill in all required fields");
            return;
        }

        try {
            const response = await fetch("/api/registeruser/manageregistereduser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Error during registration verification");
            }

            console.log("User verified successfully!");
            Cookies.remove("mailregistration");
            Cookies.remove("coderegistration");
        } catch (error) {
            console.error("Verification Error:", error);
            throw error;
        }
    };

    return (
        <div style={{ backgroundColor: "#2854A3", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                    {/* Spinner Overlay */}
                    {loading && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                zIndex: 2,
                            }}
                        >

                        </Box>
                    )}
                    {/* Regola di Next.js: Qualsiasi file in /public può essere accessibile direttamente con src="/nomefile.ext" */}
                    <Image
                        src="/LogoClaim_F.png"
                        alt="Logo Aziendale"
                        width={150}
                        height={150}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: "white", // Testo principale bianco
                            textAlign: "center",
                            fontWeight: "bold",
                            mt: 2,
                            mb: 2,
                            px: 2, // Aggiunge padding per una migliore leggibilità
                        }}
                    >
                        Abbiamo inviato un codice di verifica all&apos;indirizzo email: <strong style={{ color: "yellow" }}>{mailregistration}</strong>.
                        Controlla la tua casella di posta, inclusa la cartella spam, e inserisci il codice ricevuto per confermare la registrazione.
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            label="Enter code (case sensitive)"
                            variant="outlined"
                            fullWidth
                            value={codetocheck}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{
                                style: { color: "white" }, // Mantiene la label bianca
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" }, // Bordo bianco di default
                                    "&:hover fieldset": { borderColor: "white !important" }, // Effetto hover bianco
                                    "&.Mui-focused fieldset": { borderColor: "white !important" }, // Bordo bianco al focus
                                },
                                "& .MuiInputLabel-root": {
                                    color: "white", // Label bianca
                                    "&.Mui-focused": { color: "white" }, // Label rimane bianca al focus
                                },
                                input: { color: "white" }, // Testo scritto in bianco
                            }}
                        />


                        <Button className={styles.ConfirmedMail}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleMailConfirmed}
                            disabled={loading} // Disable button while loading
                        >
                            Verifica
                        </Button>

                        <Button className={styles.ConfirmedMailCancel}
                            fullWidth
                            color="error"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => router.push('/intranet')}
                            disabled={loading} // Disable button while loading
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default ConfirmedMail;
