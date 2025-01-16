import { useRouter } from 'next/router';

import Cookies from "js-cookie";

import { Box, Typography, TextField, CircularProgress, Button, FormControl, styled } from "@mui/material";
import React, {useState, useEffect } from "react";

import DynamicBreadCrumbs from '../../../components/DynamicBreadCrumbs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { format, parseISO } from 'date-fns';

import styles from '../AllUsers.module.css';

const UserContainer = styled(Box)`
    width: 50%;
    margin: 5% auto 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ViewUserDetails = () => {
    // const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    const { id } = router.query; // Extract the dynamic route parameter
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [listTipoUtente, setListTipoUtente] = useState([]);
    const [isClient, setIsClient] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // Stops Checking When Component Unmounts (clearInterval)
    useEffect(() => {
        if (!id) return; // Prevent running the effect when id is undefined

        console.log("Fetching user with ID:", id);
        getUserById(id);
        getAllTipoUtente();

        setIsClient(true); // This ensures the component knows it's running on the client
        const checkAuth = () => {
            const auth = Cookies.get("isAuthenticated") === "true"; // Convert to boolean
            const user = Cookies.get("username");
            setIsAuthenticated(auth);
            setUsername(user || "");
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
            console.error("getAllTipoUtente Error:"+ err);
        }
    };

    // Ensure the date is parsed correctly before setting it
    const formattedDate = (dateString) => {
        if (!dateString) return ""; // Handle empty/null values
        return format(parseISO(dateString), "yyyy-MM-dd");
    };

    // fetch getUserById
    const getUserById = async (id) => {
        if (!id) {
            console.error("Error: User ID is undefined");
            setError("Invalid User ID");
            alert("Error: User ID is undefined");
            return;
        };

        try {
            const response = await fetch(`/api/utente/manageuser?id=${id}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            });
      
            const data = await response.json();
            debugger;
      
            if (!response.ok) {
              setError(data.message || "Errore durante getUserById");
              alert("Errore nel recupero dell'utente. " + data.error);
              return;
            }

            console.log("User Data:" + data.users[0]); // First user in the array
            if (!data.users || data.users.length === 0) {
                setError("Nessun utente trovato.");
                return;
            }

            setUser(data.users[0]);

            setLoading(false);
      
          } catch (err) {
            setLoading(false);
            console.error('Error fetching getUserById:'+ err);
            
            setError(err.message);
            console.error("Error during getUserById:"+ err);
          }
    }
    
    // const GoBack = async () => {
    //     router.push("/intranet/allusers");
    // }

    return (
        <>
        {/* Breadcrumbs */}
        <Box sx={{ margin: '16px' } }>
            <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
        </Box>
        <UserContainer>
                <Typography variant="h4" sx={{ marginBottom: 3 }}>
                    User Details - ID: {id} - Read only
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        <FormControl fullWidth margin="normal">
                            <TextField label="Nome" value={user.Nome} InputProps={{ readOnly: true }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField label="Cognome" value={user.Cognome} InputProps={{ readOnly: true }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField label="Email" value={user.Email} InputProps={{ readOnly: true }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField label="Telefono" value={user.Phone} InputProps={{ readOnly: true }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField label="Data di Nascita" value={formattedDate(user.DataDiNascita)} InputProps={{ readOnly: true }} />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <TextField label="Tipo Utente" value={user.TipoUtente} InputProps={{ readOnly: true }} />
                        </FormControl>

                        <Button
                            variant="contained"
                            sx={{ mt: 3 }}
                            className={styles.BtnBackAllUsers}
                            onClick={() => router.push("/intranet/allusers")}
                        >
                            Back
                        </Button>
                    </>
                )}
            </UserContainer>
        </>
    );
}

export default ViewUserDetails;