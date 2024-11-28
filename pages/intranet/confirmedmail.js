import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './ConfirmedMail.module.css';


import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Typography
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
// next link
import Link from 'next/link';

const ConfirmedMail = () => {
    // To navigate to another page
    const router = useRouter();

    const handleMailConfirmed = () => {
        // Redirect to home page intranet
        router.push("/intranet/home");
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
                <Typography variant="h5">Mail Verificata</Typography>
                <Box sx={{ mt: 3 }}>
                

                <Button className={styles.ConfirmedMail}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleMailConfirmed}
                >
                    Ok
                </Button>

                </Box>
            </Box>
            </Container>
        </>
    );
}

export default ConfirmedMail;