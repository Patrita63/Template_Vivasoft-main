import { FormControl, FormGroup, InputLabel, Input, Typography, Button, styled, FormHelperText, Autocomplete, TextField } from "@mui/material";
import React, {useState, useEffect } from "react";
import { useRouter } from 'next/router';

import Cookies from "js-cookie";

// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { format, parseISO } from 'date-fns';

// import styles from './AllUsers.module.css';

const UserContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    background-color: white;
`

const AddUser = () => {
    // const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();

    const [error, setError] = useState(null);

    // const [isDataReady, setIsDataReady] = useState(false);

    const [listTipoUtente, setListTipoUtente] = useState([]);

    const [isClient, setIsClient] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    // Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. 
    // Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments
    // Validation
    const initialValues = {
        nome: '',
        cognome: '',
        email: '',
        datadinascita: parseISO('2007-01-01'),
        phone: '',
        idtipoutente: 0,
        tipoutente: ''
    };

    const [formValues, setFormValues] = useState(initialValues);
    // Validation
    const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
        defaultValues: formValues
    }); 

    // Stops Checking When Component Unmounts (clearInterval)
    useEffect(() => {

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
        
    }, [setValue]);

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
            console.error("getAllTipoUtente Error:", err);
        }
    };

    // nome, cognome, email, datadinascita, phone, idtipoutente
    const handleAddUser = async (newUserData) => {
        console.log("Sending data to API:", newUserData); // Log data before sending
        try {
            
            const response = await fetch("/api/utente/manageuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                nome: newUserData.nome,
                cognome: newUserData.cognome,
                email: newUserData.email,
                datadinascita: newUserData.datadinascita,
                phone: newUserData.phone,
                idtipoutente: newUserData.tipoutente.id
                }),
            });

            console.log("Full API response:", response);
            console.log("Response status:", response.status);
      
            const data = await response.json();
        
            if (!response.ok) {
                alert(data.error || "Errore durante l'aggiunta dell'utente");
                return;
            }
        
            console.log("User added successfully!");
            // Redirect to AllUsers page
            router.push("/intranet/allusers");
        } catch (err) {
          console.error("Add User Error:", err);
        }
    };

    // Validation
    const onSubmit = async (data) => {
        debugger;
        console.log('Form Data:', data);

        if (!data.tipoutente || !data.tipoutente.id) {
            console.error("Error: tipoutente does not have an ID", data.tipoutente);
            alert("Please select a valid User Type.");
            return;
        }

        console.log('AFTER data.datadinascita: ' + data.datadinascita);

        const formattedDate = format(data.datadinascita, 'yyyy-MM-dd');
        // console.log(formattedDate); // Output: "2025-01-01"
        data.datadinascita = formattedDate;
        console.log('BEFORE data.datadinascita: ' + data.datadinascita);

        console.log('Form Data - data.tipoutente.id: ', data.tipoutente.id);

        // setFormValues(data);

        handleAddUser(data);

        /* const alreadyExist = await checkUserByEmailExists(data.email);
        if(!alreadyExist) {
            AddUserData(data);
        }
        else
        {
            alert("Already exists a user with mail " + data.email);
        } */
    };

    
    const GoBack = async () => {
        router.push("/intranet/allusers");
    }

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
        !errors.cognome && // No errors on cognome
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

    return (
        <UserContainer>
            <Typography variant="h4">Add User</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="nome"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.nome}>
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
                        <FormControl fullWidth error={!!errors.cognome}>
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
                        <FormControl fullWidth error={!!errors.email}>
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
                    <FormControl fullWidth error={!!errors.phone}>
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
                        <FormControl fullWidth error={!!errors.datadinascita}>
                        <DatePicker
                            label="Date of Birth"
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)} // Update the form state
                            // OLD renderInput={(params) => <TextField {...params} />}
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
                    <FormControl fullWidth error={!!errors.tipoutente}>
                        <Autocomplete
                        id="tipoutente"
                        options={listTipoUtente}
                        getOptionLabel={(option) => option?.TipoUtente || ''}
                        isOptionEqualToValue={(option, value) => option.Id === value?.id}
                        value={field.value || null}
                        onChange={(event, newValue) => {
                            field.onChange(newValue ? { id: newValue.Id, TipoUtente: newValue.TipoUtente } : null);
                        }}

                        renderInput={(params) => (
                            <TextField {...params} label="Select a User Type" />
                        )}

                        />
                        <FormHelperText>{errors.tipoutente?.message}</FormHelperText>
                    </FormControl>
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    // className={styles.BtnBackAllUsers}
                    sx={{ 
                        mt: 2,
                        backgroundColor: "primary.dark",
                        "&:hover": {
                            backgroundColor: "primary.dark"
                        }
                     }}
                    onClick={GoBack}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary.dark"
                    sx={{ mt: 2 }}
                    disabled={!isFormValid()} // Button is disabled if the form is invalid
                    >
                    Add User
                </Button>
            </form>
        </UserContainer>
    );
}

export default AddUser;