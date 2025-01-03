import { FormControl, FormGroup, InputLabel, Input, Typography, Button, styled, FormHelperText, Autocomplete, TextField } from "@mui/material";
import React, {useState, useEffect } from "react";
import { useRouter } from 'next/router';

// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

import loadDatabase from '../../lib/databasesqlite';
const localforage = require("localforage");

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
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();

    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [isDataReady, setIsDataReady] = useState(false);

    const [listTipoUtente, setListTipoUtente] = useState([]);

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

    useEffect(() => {
        const initializeDatabase = async () => {
            
            try {
                setIsDataReady(false);
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('adduser.js - databasePath: ' + databasePath);
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

            } catch (err) {
                setIsDataReady(false);
                setError(err.message);
                console.log('AddUser - useEffect error' + err.message);
            }
        };

        initializeDatabase();

    }, [setValue]);

    // Validation
    const onSubmit = async (data) => {
        // debugger;
        console.log('Form Data:', data);
        console.log('AFTER data.datadinascita: ' + data.datadinascita);

        const formattedDate = format(data.datadinascita, 'yyyy-MM-dd');
        // console.log(formattedDate); // Output: "2025-01-01"
        data.datadinascita = formattedDate;
        console.log('BEFORE data.datadinascita: ' + data.datadinascita);

        AddUserData(data);

        /* const alreadyExist = await checkUserByEmailExists(data.email);
        if(!alreadyExist) {
            AddUserData(data);
        }
        else
        {
            alert("Already exists a user with mail " + data.email);
        } */
    };

    const AddUserData = async (user) => {
        console.log('AddUserData dataUser:', user);

        if (!db) {
            console.error('Database is not initialized');
            return;
        }

        try {
            
            // Check if the user exists before addition
            const checkUser = db.exec(`SELECT * FROM T_Utente WHERE Email = '${user.email}'`);
            console.log("User already exists:", checkUser);
    
            if (!checkUser || checkUser.length === 0) {
                // Add the user
                const query = `
                    INSERT INTO [T_Utente]
                        ([Nome]
                        ,[Cognome]
                        ,[Email]
                        ,[Phone]
                        ,[DataDiNascita]
                        ,[IdTipoUtente])
                    VALUES
                        ('${user.nome}'
                        ,'${user.cognome}'
                        ,'${user.email}'
                        ,'${user.phone}'
                        ,'${user.datadinascita}'
                        ,${user.tipoutente.value})`;
                db.run(query);
                console.log("User added successfully.");
        
                // ✅ Save the updated database back to IndexedDB
                const updatedDb = db.export();
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('AddUserData - databasePath: ' + databasePath);
                await localforage.setItem(databasePath, updatedDb);
                console.log("Database saved to IndexedDB after addition.");
        
                // Redirect to AllUsers page
                router.push("/intranet/allusers");
            }
    
        } catch (error) {
            console.error("Error adding user:", error);
        }
    }

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
        !errors.cognome && // No errors on username
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
                    // className={styles.BtnBackAllUsers}
                    sx={{ 
                        mt: 2,
                        backgroundColor: "primary.main",
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
                    color="primary"
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