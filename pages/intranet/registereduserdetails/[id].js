import { useRouter } from 'next/router';

import Cookies from "js-cookie";

import { FormControl, FormGroup, FormLabel, FormControlLabel, InputLabel, Input, Typography, Button, styled, FormHelperText, Autocomplete, TextField, CircularProgress, RadioGroup, Radio } from "@mui/material";
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

import styles from '../AllRegisteredUsers.module.css';

const UserContainer = styled(Box)`
    width: 50%;
    margin: 5% auto 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const RegisteredUserDetails = () => {
    // const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    const { id } = router.query; // Extract the dynamic route parameter
    const [error, setError] = useState(null);

    const [isDataReady, setIsDataReady] = useState(false);

    const [listTipoUtente, setListTipoUtente] = useState([]);
    const [listRuolo, setListRuolo] = useState([]);
    const [isClient, setIsClient] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    // Validation
    // N.B. Issue: data Object Lacks id Property in onSubmit
    // The problem is that react-hook-form does not automatically include the id field unless it's explicitly registered in the form.
    // Solution: Add id to defaultValues in useForm
    // Ensure the id field is included in the form defaults:
    const initialValues = {
        id: 0,  // ✅ Ensure `id` is included
        nome: '',
        cognome: '',
        gender: 'M',
        email: '',
        dataregistrazione: '',
        phone: '',
        idtipoutente: 0,
        tipoutente: '',
        password: '',
        code: '',
        note: '',
        idruolo: 0,
        ruolo: ''
    };

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

                console.log("User Data:" + data.users[0]); // First user in the array
                // N.B. After fetching user data, you must update the form fields using setValue from react-hook-form.

                // Extract user details
                const user = data.users[0];

                // Convert Date to "yyyy-MM-dd" format
                const formattedDate = user.DataRegistrazione ? format(parseISO(user.DataRegistrazione), "yyyy-MM-dd") : "";

                // Populate form fields with fetched data
                setValue("id", user.Id);
                setValue("nome", user.Nome);
                setValue("cognome", user.Cognome);
                setValue("gender", user.Gender);
                setValue("email", user.Email);
                setValue("dataregistrazione", formattedDate); // Correct format
                setValue("phone", user.Phone);
                setValue("tipoutente", { id: user.IdTipoUtente, TipoUtente: user.TipoUtente }); // Ensure object format
                setValue("password", user.Password);
                setValue("code", user.Code);
                setValue("note", user.Note);
                setValue("ruolo", { id: user.IdRuolo, Ruolo: user.Ruolo }); // Ensure object format
                setIsDataReady(true);
        
            } catch (err) {
                setIsDataReady(false);
                console.error('Error fetching getUserRegisteredById:'+ err);
                
                setError(err.message);
                console.error("Error during getUserRegisteredById:"+ err);
            }
        };

        if (!id) return; // Prevent running the effect when id is undefined
        console.log("Fetching user with ID:", id);

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
            console.error("getAllRuolo Error:"+ err);
        }
    };

    // Validation
    const onSubmit = async (data, event) => {
        debugger;
        data.idruolo = data.ruolo.Id;
        console.log('Form Submitted:' + data);
        const clickedButton = event.nativeEvent.submitter.name; // Access submitter's name
        // Get the name of the button clicked

        if (clickedButton === 'update') {
            handleUpdateRegisteredUser(data);
        } 
    };

    // Validation
    const watchAllFields = watch(); // Watch all fields for enabling the button.
    // Validation
    const isFormValid = () => {
        const isValid = watchAllFields.nome &&
        watchAllFields.cognome &&
        watchAllFields.gender &&
        watchAllFields.email &&
        watchAllFields.phone &&
        watchAllFields.dataregistrazione &&
        watchAllFields.tipoutente &&
        watchAllFields.ruolo &&
        watchAllFields.password &&
        watchAllFields.code &&
        watchAllFields.note &&
        !errors.tipoutente && // No errors on tipoutente
        !errors.nome && // No errors on name
        !errors.cognome && // No errors on surname
        !errors.gender && // No errors on gender
        !errors.email && // No errors on email
        !errors.phone && // No errors on phone
        !errors.dataregistrazione && // No errors on dataregistrazione
        Object.keys(errors).length === 0;
        // console.log('errors.tipoutente: ' + errors.tipoutente);
        // console.log('isValid: ' + isValid);
        return (
            isValid
        );
    };

    const handleUpdateRegisteredUser = async (newUserData) => {
        debugger;
        console.log("Sending data to API:" + newUserData); // Log data before sending
        try {
            // id, nome, cognome, phone, email, dataregistrazione, idtipoutente, idruolo, password, code, note
            const response = await fetch("/api/registeruser/manageregistereduser", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                id: newUserData.id,
                nome: newUserData.nome,
                cognome: newUserData.cognome,
                gender: newUserData.gender,
                phone: newUserData.phone,
                email: newUserData.email,
                dataregistrazione: newUserData.dataregistrazione,
                idtipoutente: newUserData.tipoutente.id,
                idruolo: newUserData.ruolo.Id,
                password: newUserData.password,
                code: newUserData.code,
                note: newUserData.note
                }),
            });
            debugger;
            console.log("Full API response:" + response);
            console.log("Response status:"+ response.status);
      
            const data = await response.json();
        
            if (!response.ok) {
                alert(data.error || "Errore durante l'aggiornamento dell'utente registrato.");
                return;
            }
        
            console.log("Registered User updated successfully!");
            // Redirect to AllUsers page
            router.push("/intranet/allregisteredusers");
        } catch (err) {
          console.error("Update Registered User Error: "+ err);
        }
    };

    const GoBack = async () => {
        router.push("/intranet/allregisteredusers");
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
            <Typography variant="h4">Registered User Details with ID: {id} - Edit</Typography>
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
                    name="gender"
                    control={control}
                    rules={{
                    required: 'Gender is required',
                    }}
                    render={({ field }) => (
                        <FormControl component="fieldset" error={!!errors.gender} fullWidth>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                            {...field}
                            row // Arrange options horizontally
                            aria-label="gender"
                            name="gender"
                            onChange={(event) => handleGenderChange(event, field)}
                            >
                            <FormControlLabel value="M" control={<Radio />} label="Male" />
                            <FormControlLabel value="F" control={<Radio />} label="Female" />
                            </RadioGroup>
                            <FormHelperText>{errors.gender?.message}</FormHelperText>
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
                        name="dataregistrazione"
                        control={control}
                        rules={{
                            required: 'Date of Registration is required',
                        }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.dataregistrazione}>
                            <DatePicker
                                label="Date of Registration"
                                value={field.value ? parseISO(field.value) : null} // Convert string to Date
                                onChange={(newValue) => {
                                    const formatted = newValue ? format(newValue, "yyyy-MM-dd") : "";
                                    field.onChange(formatted);
                                }}
                                slots={{ textField: (props) => <TextField {...props} /> }}
                            />
                            <FormHelperText>{errors.dataregistrazione?.message}</FormHelperText>
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
                <Controller
                    name="ruolo"
                    control={control}
                    rules={{
                    required: 'User Role is required',
                    }}
                    render={({ field }) => (
                    <FormControl fullWidth margin="normal" error={!!errors.ruolo}>
                        <Autocomplete
                        id="ruolo"
                        options={listRuolo}
                        getOptionLabel={(option) => option?.Ruolo || ''}
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        value={field.value || null}
                        onChange={(event, newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Select a User Role" />
                        )}
                        />
                        <FormHelperText>{errors.ruolo?.message}</FormHelperText>
                    </FormControl>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" error={!!errors.password}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input {...field} type='password' id="password" />
                        <FormHelperText>{errors.password?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="code"
                    control={control}
                    rules={{ required: 'Code is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" error={!!errors.code}>
                        <InputLabel htmlFor="code">Code</InputLabel>
                        <Input {...field} id="code" />
                        <FormHelperText>{errors.code?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="note"
                    control={control}
                    rules={{ required: 'Notes are required' }}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal" error={!!errors.note}>
                        <InputLabel htmlFor="note">Note</InputLabel>
                        <Input {...field} id="note" />
                        <FormHelperText>{errors.note?.message}</FormHelperText>
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

export default RegisteredUserDetails;