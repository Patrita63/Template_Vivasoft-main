import { useRouter } from 'next/router';

import { FormControl, FormGroup, InputLabel, Input, Typography, Button, styled, FormHelperText, Autocomplete, TextField, CircularProgress } from "@mui/material";
import React, {useState, useEffect } from "react";
import loadDatabase from '../../../lib/databasesqlite';

import DynamicBreadCrumbs from '../../../components/DynamicBreadCrumbs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { Box } from "@mui/material";

// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

// PATRIZIO import { addUser, getRoles, checkUserByEmailExists } from "../service/api";
import styles from '../AllUsers.module.css';

const UserContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    background-color: white;
`

const UserDetails = () => {
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    const { id } = router.query; // Extract the dynamic route parameter

    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [isDataReady, setIsDataReady] = useState(false);

    const [listTipoUtente, setListTipoUtente] = useState([]);

    // Validation
    const initialValues = {
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

    useEffect(() => {
        if (id) {
            // Perform some action with the id
            console.log('ID from query:', id);
        }

        const initializeDatabase = async (idUser) => {
            
            try {
                setIsDataReady(false);
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('intranet-userdetails.js - databasePath: ' + databasePath);
                const database = await loadDatabase(databasePath);
                setDb(database);
                console.log('database: ' + database);
                // debugger;

                if(database){
                    const query = 'SELECT Id, TipoUtente, Descrizione FROM T_TipoUtente';
                    console.log('query: ' + query);
                    const result = database.exec(query);
                    // debugger;
                    const rows = result[0]?.values || [];

                    const transformedArray = rows.map(item => ({
                        value: item[0],
                        TipoUtente: item[1]
                    }));
                      
                    console.log(transformedArray);

                    setListTipoUtente(transformedArray);
                    
                    setIsDataReady(true);
                    setLoading(false); // Data is loaded
                }

                if(database){
                    // const query = `SELECT Id,Nome,Cognome,Email,DataDiNascita,Phone,IdTipoUtente FROM T_Utente WHERE Id=${idUser}`;
                    const query = `SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[Phone],ut.[IdTipoUtente],tu.TipoUtente FROM T_Utente AS ut INNER JOIN T_TipoUtente AS tu ON tu.Id = ut.IdTipoUtente WHERE ut.[Id]=${idUser}`;
                    
                    console.log('query: ' + query);
                    const result = database.exec(query);
                    // debugger;
                    const rows = result[0]?.values || [];
                    // setData(rows.map(([id, nome, cognome, email,datadinascita,phone,idtipoutente]) => ({ id, nome, cognome, email, datadinascita, phone, idtipoutente })));
                    
                    // Update formValues with the API response
                    // setFormValues(rows.map(([id, nome, cognome, email,datadinascita,phone,idtipoutente]) => ({ id, nome, cognome, email, datadinascita, phone, idtipoutente })));
                    
                    // Set values in the form
                    setValue('nome', rows[0][1]);
                    setValue('cognome', rows[0][2]);
                    setValue('email', rows[0][3]);

                    if(rows[0][4] === null){
                        setValue('datadinascita','2024-01-01');
                    } else {
                        setValue('datadinascita', new Date(rows[0][4])); // Convert to Date object
                        // setValue('datadinascita', rows[0][4]);
                    }

                    
                    if(rows[0][5] === null){
                        setValue('phone','');
                    } else {
                        setValue('phone', rows[0][5]);
                    }
                    
                    setValue('idtipoutente', rows[0][6]);

                    const transformedSelectedValue = {
                        value: rows[0][6],
                        TipoUtente: rows[0][7]
                    };
                
                    // Set the default value for 'tipoutente'
                    setValue('tipoutente', transformedSelectedValue);

                    /* Object.entries(rows).forEach(([key, value]) => {
                        setValue(key, value);
                    }); */

                    setIsDataReady(true);
                    setLoading(false); // Data is loaded
                }
                
            } catch (err) {
                setIsDataReady(false);
                setError(err.message);
                console.log('UserDetails - useEffect error' + err.message);
            }
        };

        if(id !== undefined){
            initializeDatabase(id);
        }
       
    }, [id, setValue]);


    // Validation
    const onSubmit = async (data, event) => {
        console.log('Form Submitted:', data);
        const clickedButton = event.nativeEvent.submitter.name; // Access submitter's name
        // Get the name of the button clicked

        if (clickedButton === 'update') {
            UpdateUserData(data);
        } else if (clickedButton === 'delete') {
            DeleteUserData(data);
        }
        // debugger;
        /* console.log('Form Data:', data);
        const alreadyExist = await checkUserByEmailExists(data.email);
        if(!alreadyExist) {
            AddUserData(data);
        }
        else
        {
            alert("Already exists a user with mail " + data.email);
        } */
    };

    // Validation
    const watchAllFields = watch(); // Watch all fields for enabling the button.
    // Validation
    const isFormValid = () => {
        const isValid = watchAllFields.nome &&
        watchAllFields.cognome &&
        watchAllFields.email &&
        // watchAllFields.phone &&
        !errors.tipoutente && // No errors on tipoutente
        !errors.nome && // No errors on name
        !errors.cognome && // No errors on username
        !errors.email && // No errors on email
        // !errors.phone && // No errors on phone
        Object.keys(errors).length === 0;
        // console.log('errors.role: ' + errors.role);
        // console.log('isValid: ' + isValid);
        return (
            isValid
        );
    };

    const UpdateUserData = async (dataUser) => {
        // await addUser(user);
        console.log('UpdateUserData dataUser:', dataUser);

        // Redirect to AllUsers page intranet
        // router.push("/intranet/allusers");
    }

    const GoBack = async () => {
        router.push("/intranet/allusers");
    }

    const DeleteUserData = async (dataUser) => {
        console.log('DeleteUserData dataUser:', dataUser);
        // Redirect to AllUsers page intranet
        // router.push("/intranet/allusers");
    }

    if (loading) {
        return <CircularProgress />; // Show a loading spinner while data is being fetched
    }

    return (
        <>
        {/* Breadcrumbs */}
        <Box sx={{ margin: '16px' } }>
            <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
        </Box>
        <UserContainer>
            <Typography variant="h4">User Details with ID: {id}</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="nome"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.name}>
                            <InputLabel htmlFor="nome">Nome</InputLabel>
                            <Input {...field} id="nome" />
                            <FormHelperText>{errors.nome?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="cognome"
                    control={control}
                    rules={{ required: 'Username is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.username}>
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
                    type="submit"
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
                    className={styles.BtnUpdateUser}
                    sx={{ mt: 2 }}
                    disabled={!isFormValid()} // Button is disabled if the form is invalid
                >
                    Update User
                </Button>
                <Button
                    type="submit"
                    name="delete" // Unique name to identify the button
                    variant="contained"
                    className={styles.BtnDeleteUser}
                    sx={{ mt: 2 }}
                >
                    Delete
                </Button>
            </form>
        </UserContainer>
        </>
    );
}

export default UserDetails;