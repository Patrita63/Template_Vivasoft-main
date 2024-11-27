import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Register.module.css';

import { RegisterData } from '../../Models/registerdata';

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
// next link
import Link from 'next/link';

const Register = () => {
    // To navigate to another page
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");

    const [isRegistered, setIsRegistered] = useState(false);

    const handleCancel = () => {
        // Redirect to home page intranet
        router.push("/intranet/home");
    }

    // Call rest api using AXIOS ASYNC
    const handleRegister = async () => {
        localStorage.setItem("username", name);
        localStorage.setItem("mail", email);
        localStorage.setItem("password", password);
        localStorage.setItem("confirmpassword", confirmpassword);
        localStorage.setItem("address", address);

        /* const API_URL = urlRootAPI + "ManageAccount/Register";
        console.log(API_URL); */

        const registerUserData = new RegisterData(name, email, password, confirmpassword, address);
        const isPasswordOK = registerUserData.checkPassword();
        console.log("Register - Password Confirmed = " + isPasswordOK);
        debugger;
        /* await axios.post(API_URL, registerUserData, {
            headers: {
            "Content-Type": "application/json"
            }
        })
        .then((response) => {
            debugger;
            if(response.data){
            setIsRegistered(response.data);
            console.log(response.data);
            console.log(response.status);
            localStorage.setItem("isRegisterd", response.data);

            if(response.data)
            {
                // SEND MAIL CON IN CC p.tardiolobonifazi@vivasoft.it
                // To navigate to another component ConfirmedMail
                navigate("/");
            }
            
            }
        })
        .catch((error) => {
            localStorage.clear();
            console.log(error);
        }); */

        setIsRegistered(isPasswordOK);
        localStorage.setItem("isRegistered", String(isPasswordOK));

        if(isPasswordOK){
            
            // Redirect to ConfirmedMail page intranet
            router.push("/intranet/confirmedmail");
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
                <Typography variant="h5">Register</Typography>
                <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Grid>

                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confirmpassword"
                        label="confirmPassword"
                        type="password"
                        id="confirmpassword"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        name="address"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        autoFocus
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    </Grid>
                </Grid>

                <Button className={styles.RegisterCancel}
                    fullWidth
                    color="error"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>

                <Button className={styles.Register}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        {/* https://stackoverflow.com/questions/38382153/multiple-classnames-with-css-modules-and-react */}
                        <Link className={`${styles.CenterDiv} ${styles.UnderLine}`} href={'/intranet/auth/login'}>Hai già un account? Accedi</Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Container>
        </>
    );
}

export default Register;
