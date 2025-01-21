import { useRouter } from 'next/router';

import Cookies from "js-cookie";

import { FormControl, FormGroup, InputLabel, Input, Typography, Button, styled, FormHelperText, Autocomplete, TextField, CircularProgress } from "@mui/material";
import React, {useState, useEffect } from "react";

import NavIntranetMenu from '../../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../../components/DynamicBreadCrumbs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { format, parseISO } from 'date-fns';

import { Box } from "@mui/material";

// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

import styles from '../AllUsers.module.css';

// const UserContainer = styled(FormGroup)`
//     width: 50%;
//     margin: 5% auto 0 auto;
//     background-color: white;
// `

const UserContainer = styled(Box)`
    width: 50%;
    margin: 5% auto 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const UserDetails = () => {
    // const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    const { id } = router.query; // Extract the dynamic route parameter
    const [error, setError] = useState(null);

    const [isDataReady, setIsDataReady] = useState(false);

    const [listTipoUtente, setListTipoUtente] = useState([]);
    const [isClient, setIsClient] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // Validation
    // N.B. Issue: data Object Lacks id Property in onSubmit
    // The problem is that react-hook-form does not automatically include the id field unless it's explicitly registered in the form.
    // Solution: Add id to defaultValues in useForm
    // Ensure the id field is included in the form defaults:
    const initialValues = {
        id: 0,  // ✅ Ensure `id` is included
        nome: '',
        cognome: '',
        email: '',
        datadinascita: '',
        phone: '',
        idtipoutente: 0,
        tipoutente: ''
    };

    // Validation
    /*  const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
        defaultValues: initialValues
    }); */

    const [formValues, setFormValues] = useState(initialValues);
    const {
        control,
        watch,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: formValues
    });

    // Stops Checking When Component Unmounts (clearInterval)
    useEffect(() => {

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
                // N.B. After fetching user data, you must update the form fields using setValue from react-hook-form.

                // // Format and map user data correctly
                // const user = data.users[0];
                // const formattedUser = {
                //     id: user.Id,
                //     nome: user.Nome,
                //     cognome: user.Cognome,
                //     email: user.Email,
                //     datadinascita: user.DataDiNascita ? format(parseISO(user.DataDiNascita), "yyyy-MM-dd") : "",
                //     idtipoutente: user.IdTipoUtente,
                //     phone: user.Phone,
                //     tipoutente: user.TipoUtente
                // };
                // setFormValues(formattedUser);

                // Extract user details
                const user = data.users[0];

                // Convert Date to "yyyy-MM-dd" format
                const formattedDate = user.DataDiNascita ? format(parseISO(user.DataDiNascita), "yyyy-MM-dd") : "";

                // Populate form fields with fetched data
                setValue("id", user.Id);
                setValue("nome", user.Nome);
                setValue("cognome", user.Cognome);
                setValue("email", user.Email);
                setValue("datadinascita", formattedDate); // Correct format
                setValue("phone", user.Phone);
                setValue("tipoutente", { id: user.IdTipoUtente, TipoUtente: user.TipoUtente }); // Ensure object format

                setIsDataReady(true);
        
            } catch (err) {
                setIsDataReady(false);
                console.error('Error fetching getUserById:'+ err);
                
                setError(err.message);
                console.error("Error during getUserById:"+ err);
            }
        };

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
        
    }, [id, setValue]); // Runs when `id` changes

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

    // // Ensure the date is parsed correctly before setting it
    // const formattedDate = (dateString) => {
    //     if (!dateString) return ""; // Handle empty/null values
    //     return format(parseISO(dateString), "yyyy-MM-dd");
    // };

    // Validation
    const onSubmit = async (data, event) => {
        debugger;
        console.log('Form Submitted:' + data);
        const clickedButton = event.nativeEvent.submitter.name; // Access submitter's name
        // Get the name of the button clicked

        if (clickedButton === 'update') {
            handleUpdateUser(data);
        } else if (clickedButton === 'delete') {
            handleDeleteUser(data.id);
        }
    };

    // Validation
    const watchAllFields = watch(); // Watch all fields for enabling the button.
    // Validation
    const isFormValid = () => {
        const isValid = watchAllFields.nome &&
        watchAllFields.cognome &&
        watchAllFields.email &&
        watchAllFields.phone &&
        watchAllFields.datadinascita &&
        watchAllFields.tipoutente &&
        !errors.tipoutente && // No errors on tipoutente
        !errors.nome && // No errors on name
        !errors.cognome && // No errors on surname
        !errors.email && // No errors on email
        !errors.phone && // No errors on phone
        !errors.datadinascita && // No errors on datadinascita
        Object.keys(errors).length === 0;
        // console.log('errors.tipoutente: ' + errors.tipoutente);
        // console.log('isValid: ' + isValid);
        return (
            isValid
        );
    };

    const handleUpdateUser = async (newUserData) => {
        debugger;
        console.log("Sending data to API:" + newUserData); // Log data before sending
        try {
            
            const response = await fetch("/api/utente/manageuser", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                id: newUserData.id,
                nome: newUserData.nome,
                cognome: newUserData.cognome,
                email: newUserData.email,
                datadinascita: newUserData.datadinascita,
                phone: newUserData.phone,
                idtipoutente: newUserData.tipoutente.Id
                }),
            });
            debugger;
            console.log("Full API response:" + response);
            console.log("Response status:"+ response.status);
      
            const data = await response.json();
        
            if (!response.ok) {
                alert(data.error || "Errore durante l'aggiornamento dell'utente");
                return;
            }
        
            console.log("User updated successfully!");
            // Redirect to AllUsers page
            router.push("/intranet/allusers");
        } catch (err) {
          console.error("Update User Error: "+ err);
        }
    };

    const GoBack = async () => {
        router.push("/intranet/allusers");
    }

    return (
        <>
        {/* NavIntranetMenu */}
        {isClient && (
            <div>
                <NavIntranetMenu />
            </div>
        )}
        {/* Breadcrumbs */}
        <Box sx={{ margin: '16px' } }>
            <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
        </Box>
        <UserContainer>
            <Typography variant="h4">User Details with ID: {id} - Edit</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="id"
                    control={control}
                    render={({ field }) => <input type="hidden" {...field} />}
                />
                <Controller 
                    name="nome"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" error={!!errors.name}>
                            <InputLabel htmlFor="nome">Nome</InputLabel>
                            <Input {...field} id="nome" />
                            <FormHelperText>{errors.nome?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="cognome"
                    control={control}
                    rules={{ required: 'Surname is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" error={!!errors.cognome}>
                        <InputLabel htmlFor="cognome">Cognome</InputLabel>
                        <Input {...field} id="cognome" />
                        <FormHelperText>{errors.cognome?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                        },
                    }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" error={!!errors.email}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input {...field} id="email" />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    rules={{
                        required: 'Phone is required',
                        pattern: {
                        value: /^[0-9]+$/,
                        message: 'Enter a valid phone number',
                        },
                    }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" error={!!errors.phone}>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <Input {...field} id="phone" />
                        <FormHelperText>{errors.phone?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                        name="datadinascita"
                        control={control}
                        rules={{
                            required: 'Date of Birth is required',
                        }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.datadinascita}>
                            <DatePicker
                                label="Date of Birth"
                                value={field.value ? parseISO(field.value) : null} // Convert string to Date
                                onChange={(newValue) => {
                                    const formatted = newValue ? format(newValue, "yyyy-MM-dd") : "";
                                    field.onChange(formatted);
                                }}
                                slots={{ textField: (props) => <TextField {...props} /> }}
                            />
                            <FormHelperText>{errors.datadinascita?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </LocalizationProvider>
                <Controller
                    name="tipoutente"
                    control={control}
                    rules={{
                    required: 'User Type is required',
                    }}
                    render={({ field }) => (
                    <FormControl fullWidth margin="normal" error={!!errors.tipoutente}>
                        <Autocomplete
                        id="tipoutente"
                        options={listTipoUtente}
                        getOptionLabel={(option) => option?.TipoUtente || ''}
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        value={field.value || null}
                        onChange={(event, newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Select a User Type" />
                        )}
                        />
                        <FormHelperText>{errors.tipoutente?.message}</FormHelperText>
                    </FormControl>
                    )}
                />
                <Button
                    variant="contained"
                    className={styles.BtnBackAllUsers}
                    sx={{ mt: 2 }}
                    onClick={GoBack}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    name="update" // Unique name to identify the button
                    variant="contained"
                    className={`${styles.BtnUpdateUser} ${styles.BtnUpdateMarginLeft}`}
                    sx={{ mt: 2 }}
                    disabled={!isFormValid()} // Button is disabled if the form is invalid
                >
                    Update User
                </Button>
            </form>
        </UserContainer>
        </>
    );
}

export default UserDetails;