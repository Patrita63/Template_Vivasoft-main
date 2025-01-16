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
    TextField
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";

const ConfirmedMail = () => {
    const [codetocheck, setCodetocheck] = useState("");

    const [isClient, setIsClient] = useState(false);
    const [mailregistration, setMailregistration] = useState('');
    const [coderegistration, setCoderegistration] = useState('');

    // To navigate to another page
    const router = useRouter();

    // Stops Checking When Component Unmounts (clearInterval)
    useEffect(() => {

        setIsClient(true); // This ensures the component knows it's running on the client
        const checkAuth = () => {
            const email = Cookies.get("mailregistration"); 
            const code = Cookies.get("coderegistration");
            setMailregistration(email);
            setCoderegistration(code);
        };
    
        checkAuth(); // Run once when component mounts
    
        const interval = setInterval(checkAuth, 1000); // Check cookies every second
    
        return () => clearInterval(interval); // Cleanup on unmount
        
    }, []);

    const handleChange = (event) => {
        setCodetocheck(event.target.value);
    };

    const handleMailConfirmed = () => {
        debugger;

        if(codetocheck === coderegistration && mailregistration !== '') {
            // alert(mailregistration + ' - ' + coderegistration);
            handleCheckIfUserIsRegistered(mailregistration, coderegistration)
            // Redirect to home page intranet
            // router.push("/intranet");
        } else {
            alert("Codice Non Verificato. Controlla la mail che ti abbia inviato.");
        }
    }

    // email, code
    // See RegisterData naming 
    const handleCheckIfUserIsRegistered = async (mailregistration, coderegistration) => {
        
        if (
            !mailregistration ||
            !coderegistration
        ) {
            console.error("Missing required fields in handleCheckIfUserIsRegistered data");
            alert("Please fill in all required fields");
            return;
        }
        try {
            
            const response = await fetch("/api/registeruser/manageregistereduser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: mailregistration,
                    code: coderegistration
                }),
            });

            console.log("Full API response:" + response);
            console.log("Response status:" + response.status);
      
            const data = await response.json();
        
            if (!response.ok) {
                alert(data.error || "Errore durante la verifica della registrazione di un nuovo utente");
                return;
            }
        
            console.log("User registered and checked successfully!");

            Cookies.remove("mailregistration");
            Cookies.remove("coderegistration");
            
            // Redirect to home page intranet
            router.push("/intranet");
            
        } catch (err) {
          console.error("Check Register User Error:"+ err);
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
                >
                    Verifica
                </Button>

                <Button className={styles.ConfirmedMailCancel}
                        fullWidth
                        color="error"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => router.push("/intranet")}
                    >
                        Cancel
                </Button>

                </Box>
            </Box>
            </Container>
        </>
    );
}

export default ConfirmedMail;