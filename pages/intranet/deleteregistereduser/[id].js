import { useRouter } from 'next/router';

import Cookies from "js-cookie";

import { Box, Typography, TextField, CircularProgress, Button, FormControl, styled, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";

import NavIntranetMenu from '../../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../../components/DynamicBreadCrumbs';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { format, parseISO } from 'date-fns';

import styles from '../AllRegisteredUsers.module.css';

const UserContainer = styled(Box)`
    width: 70%;
    margin: 5% auto 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const DeleteRegisteredUser = () => {
    // const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    const { id } = router.query; // Extract the dynamic route parameter
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isDataReady, setIsDataReady] = useState(false);

    const [listTipoUtente, setListTipoUtente] = useState([]);
    const [listRuolo, setListRuolo] = useState([]);
    const [isClient, setIsClient] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    // Stops Checking When Component Unmounts (clearInterval)
    useEffect(() => {
        if (!id) return; // Prevent running the effect when id is undefined
        console.log("Fetching Registered user with ID:", id);

        // fetch getUserRegisteredById
        const getUserRegisteredById = async (id) => {
            if (!id) {
                console.error("Error: Registered User ID is undefined");
                setError("Invalid Registered User ID");
                alert("Error: Registered User ID is undefined");
                return;
            };

            try {
                // http://localhost:3000/api/registeruser/manageregistereduser?id=23
                const response = await fetch(`/api/registeruser/manageregistereduser?id=${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                debugger;

                if (!response.ok) {
                    setError(data.message || "Errore durante getUserRegisteredById");
                    alert("Errore nel recupero dell'utente registrato. " + data.error);
                    return;
                }

                console.log("Registered User Data:" + data.users[0]); // First user in the array
                // N.B. After fetching Registered user data, you must update the form fields using setValue from react-hook-form.

                // Extract Registered user details
                const user = data.users[0];

                // Convert Date to "yyyy-MM-dd" format
                const formattedDate = user.DataRegistrazione ? format(parseISO(user.DataRegistrazione), "yyyy-MM-dd") : "";

                setUser(data.users[0]);

                setLoading(false);
                setIsDataReady(true);

            } catch (err) {
                setIsDataReady(false);
                console.error('Error fetching getUserRegisteredById:' + err);

                setError(err.message);
                console.error("Error during getUserRegisteredById:" + err);
            }
        };

        getUserRegisteredById(id);
        getAllTipoUtente();
        getAllRuolo();

        setIsClient(true); // This ensures the component knows it's running on the client
        const checkAuth = () => {
            const auth = Cookies.get("isAuthenticated") === "true"; // Convert to boolean
            const user = Cookies.get("username");
            const role = Cookies.get("role");
            setIsAuthenticated(auth);
            setUsername(user || "");
            setRole(role || "");
        };

        checkAuth(); // Run once when component mounts

        const interval = setInterval(checkAuth, 1000); // Check cookies every second

        return () => clearInterval(interval); // Cleanup on unmount

    }, [id]); // Runs when `id` changes

    const getAllTipoUtente = async () => {
        try {
            const response = await fetch("/api/utente/getalltipoutente", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Errore durante getAllTipoUtente");
                return;
            }

            // Ensure `user` exists and is an array
            if (!Array.isArray(data?.user)) {
                throw new Error("Unexpected API response: 'user' field is not an array");
            }
            console.log(data?.user);

            setListTipoUtente(data?.user);

            if (!response.ok) {
                alert(data.error || "Errore durante la getAllTipoUtente");
                return;
            }

            console.log("get AllTipoUtente successfully!");

        } catch (err) {
            console.error("getAllTipoUtente Error:" + err);
        }
    };

    const getAllRuolo = async () => {
        try {
            const response = await fetch("/api/utente/getallruolo", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Errore durante getAllRuolo");
                return;
            }

            // Ensure `user` exists and is an array
            if (!Array.isArray(data?.user)) {
                throw new Error("Unexpected API response: 'user' field is not an array");
            }
            console.log(data?.user);

            setListRuolo(data?.user);

            if (!response.ok) {
                alert(data.error || "Errore durante la getAllRuolo");
                return;
            }

            console.log("get AllRuolo successfully!");

        } catch (err) {
            console.error("getAllRuolo Error:" + err);
        }
    };

    // Ensure the date is parsed correctly before setting it
    const formattedDate = (dateString) => {
        if (!dateString) return ""; // Handle empty/null values
        return format(parseISO(dateString), "yyyy-MM-dd");
    };


    const handleDeleteRegisteredUser = async (userId) => {
        if (!userId) {
            alert("Invalid Registered User ID");
            return;
        }

        try {
            const response = await fetch("/api/registeruser/manageregistereduser", {  // ✅ Remove `?id=${userId}`
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: userId })  // ✅ Send `id` in the request body
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Errore durante la cancellazione dell'utente registrato");
                return;
            }

            console.log("Registered User deleted successfully!");
            router.push("/intranet/allregisteredusers");
        } catch (err) {
            console.error("Delete Registered User Error:" + err);
        }
    };

    return (
        <>
            {/* NavIntranetMenu */}
            {isClient && (
                <div>
                    <NavIntranetMenu />
                </div>
            )}
            {/* Breadcrumbs */}
            <Box sx={{ margin: '16px' }}>
                <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
            </Box>
            {isAuthenticated && (
                <div className={styles.wrapperbody}>
                    <UserContainer>
                        <Typography variant="h4" sx={{ marginBottom: 3 }}>
                            Do you want delete registered user ID: {id}?
                        </Typography>

                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <>
                            <Grid container spacing={2}>
                                
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Id" value={user.Id} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Nome" value={user.Nome} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Cognome" value={user.Cognome} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Gender" value={user.Gender} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Email" value={user.Email} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Telefono" value={user.Phone} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Data di Registrazione" value={formattedDate(user.DataRegistrazione)} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Tipo Utente Registrato" value={user.TipoUtente} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Ruolo Utente Registrato" value={user.TipoUtente} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <TextField label="Note" value={user.Note} InputProps={{ readOnly: true }} />
                                </FormControl>
                                </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 3 }}
                                    className={styles.BtnBackAllUsers}
                                    onClick={() => router.push("/intranet/allregisteredusers")}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    name="delete" // Unique name to identify the button
                                    variant="contained"
                                    className={`${styles.BtnDeleteUser} ${styles.BtnDeleteMarginLeft}`}
                                    sx={{ mt: 2 }}
                                    onClick={() => handleDeleteRegisteredUser(user.Id)}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </UserContainer>
                </div>
            )}
        </>
    );
}

export default DeleteRegisteredUser;