import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './ConfirmedMail.module.css';

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Typography,
    TextField,
    CircularProgress,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";

const ConfirmedMail = () => {
    const [loading, setLoading] = useState(false); // Track loading state
    const [codetocheck, setCodetocheck] = useState("");

    const [mailregistration, setMailregistration] = useState('');
    const [coderegistration, setCoderegistration] = useState('');

    const router = useRouter();

    useEffect(() => {
        const email = Cookies.get("mailregistration");
        const code = Cookies.get("coderegistration");
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
        <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
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
                        <CircularProgress />
                    </Box>
                )}
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Inserire il codice ricevuto via mail</Typography>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        label="Enter code (case sensitive)"
                        variant="outlined"
                        fullWidth
                        value={codetocheck}
                        onChange={handleChange}
                        margin="normal"
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
    );
};

export default ConfirmedMail;
