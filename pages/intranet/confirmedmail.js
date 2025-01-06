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
// next link
import Link from 'next/link';

const ConfirmedMail = () => {
    const [value, setValue] = useState("");
    // To navigate to another page
    const router = useRouter();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleMailConfirmed = () => {
        debugger;
        // localStorage.setItem("registrationmail", 'p.tardiolobonifazi@vivasoft.it');
        // localStorage.setItem("registrationcode", 'e0p5m19s');

        const email = global?.localStorage?.getItem("registrationmail");
        const code = global?.localStorage?.getItem("registrationcode");

        if(value === code && email !== '') {
            localStorage.clear();
            // Redirect to home page intranet
            router.push("/intranet");
        } else {
            alert("Codice Non Verificato. Controlla la mail che ti abbia inviato.");
        }
    }

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
                    value={value}
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

                </Box>
            </Box>
            </Container>
        </>
    );
}

export default ConfirmedMail;