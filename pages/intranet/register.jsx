import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Register.module.css';

// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { format, parseISO } from 'date-fns';

import { RegisterData } from '../../Models/registerdata';

import Cookies from "js-cookie";

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    FormControl, FormGroup, InputLabel, Input, styled, FormHelperText, Autocomplete
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
// next link
import Link from 'next/link';

const UserContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    background-color: white;
`

const Register = () => {
    // To navigate to another page
    const router = useRouter();
    const [error, setError] = useState(null);

    // const [nome, setNome] = useState('');
    // const [cognome, setCognome] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [dataregistrazione, setDataregistrazione] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmpassword, setConfirmPassword] = useState('');
    // const [idtipoutente, setIdTipoUtente] = useState(0);
    // const [tipoutente, setTipoUtente] = useState('');
    // const [code, setCode] = useState('');

    const [fullname, setFullname] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [mailSubject, setMailSubject] = useState('');
    const [mailBody, setMailBody] = useState('');
    const [message, setMessage] = useState('');

    const [listTipoUtente, setListTipoUtente] = useState([]);

    const initialValues = {
        nome: '',
        cognome: '',
        email: '',
        phone: '',
        dataregistrazione: parseISO(format(new Date(), "yyyy-MM-dd")),  // Get the current date in ISO format (YYYY-MM-DD)
        idtipoutente: 0,
        tipoutente: '',
        password: '',
        confirmpassword: '',
        code: '',
    };

    const [formValues, setFormValues] = useState(initialValues);
    // Validation
    const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
        defaultValues: formValues
    }); 

    useEffect(() => {
        getAllTipoUtente();
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
                (data.error || "Errore durante la getAllTipoUtente");
                return;
            }
      
            console.log("get AllTipoUtente successfully!");
        } catch (err) {
            console.error("getAllTipoUtente Error:"+ err);
        }
    };


    const sendEmail = async (fullname, mailAddress, mailSubject, mailBody) => {
        console.log(`📧 Sending email: ${mailAddress}, Subject: ${mailSubject}, Body: ${mailBody}, FullName: ${fullname}`);
    
        try {
            const response = await fetch('/api/sendemail-acsazure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toEmail: mailAddress, subject: mailSubject, body: mailBody })
            });
    
            console.log("📤 API Response:" + response);
    
            const result = await response.json();
            console.log("📩 API Result:" + result);
    
            if (response.ok) {
                setMessage('✅ Email sent successfully!');
            } else {
                console.error(`❌ Email failed: ${result.error || 'Unknown error'}`);
                setMessage(`❌ Failed to send email: ${result.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("❌ Error in fetch:" + error.message);
            setMessage('An unexpected error occurred.');
        }
    };

    // id, nome, cognome, email, phone, dataregistrazione, idTipoUtente, password, code
    // See RegisterData naming 
    const handleAddRegisteredUser = async (newUserData) => {
        console.log("Sending data to API:", newUserData); // Log data before sending
        debugger;
        if (
            !newUserData.Nome ||
            !newUserData.Cognome ||
            !newUserData.Email ||
            !newUserData.Phone ||
            !newUserData.DataRegistrazione ||
            !newUserData.IdTipoUtente ||
            !newUserData.Password ||
            !newUserData.Code
        ) {
            console.error("Missing required fields in registration data");
            alert("Please fill in all required fields");
            return;
        }
        try {
            
            const response = await fetch("/api/registeruser/manageregistereduser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: newUserData.Nome,
                    cognome: newUserData.Cognome,
                    email: newUserData.Email,
                    phone: newUserData.Phone,
                    dataregistrazione: newUserData.DataRegistrazione,
                    idtipoutente: newUserData.IdTipoUtente,
                    password: newUserData.Password,
                    code: newUserData.Code,
                }),
            });

            console.log("Full API response:" + response);
            console.log("Response status:" + response.status);
      
            const data = await response.json();
        
            if (!response.ok) {
                alert(data.error || "Errore durante la registrazione di un nuovo utente");
                return;
            }
        
            console.log("User registered successfully!");
            Cookies.set("mailregistration", newUserData.Email, { expires: 1 / 48, secure: true }); // Expires in 30 minutes
            Cookies.set("coderegistration", newUserData.Code, { expires: 1 / 48, secure: true });

            await sendEmail(fullname,mailAddress,mailSubject,mailBody);
            
            // Redirect to ConfirmedMail page intranet
            router.push("/intranet/confirmedmail");
            
        } catch (err) {
          console.error("Register User Error:"+ err);
        } 
    };

    // Validation
    const onSubmit = async (data) => {
        debugger;
        console.log('Form Data:' + data);

        if (!data.tipoutente || !data.tipoutente.id) {
            console.error("Error: tipoutente does not have an ID"+ data.tipoutente);
            alert("Please select a valid User Type.");
            return;
        }

        const registerUserData = new RegisterData(0, data.nome, data.cognome, data.email, data.phone, data.dataregistrazione, data.idtipoutente, data.password, 0);
        const isPasswordOK = registerUserData.checkPassword(data.confirmpassword);
        console.log("Register - Password Confirmed = " + isPasswordOK);
        
        if(isPasswordOK){
            try {

                console.log('BEFORE data.dataregistrazione: ' + data.dataregistrazione);

                const formattedDate = format(data.dataregistrazione, 'yyyy-MM-dd');
                // console.log(formattedDate); // Output: "2025-01-01"
                data.dataregistrazione = formattedDate;
                console.log('After data.dataregistrazione: ' + data.dataregistrazione);
                registerUserData.DataRegistrazione = data.dataregistrazione;

                const code = registerUserData.generateCode();
                console.log('Register - email: ' + registerUserData.Email);
                console.log('Register- code: ' + code);
                registerUserData.Code = code;

                setFullname(registerUserData.Nome + ' ' + registerUserData.Cognome);
                setMailAddress(registerUserData.Email);
                setMailSubject('Benvenuto ' + registerUserData.Nome + ' ' + registerUserData.Cognome);
                setMailBody(`Questo è il codice da inserire nel pannello di conferma mail: ${registerUserData.Code}`);

                registerUserData.IdTipoUtente = data.tipoutente?.id;
                console.log('Form Data - data.tipoutente.id: ' + data.tipoutente.id);
                handleAddRegisteredUser(registerUserData);
                
        
            } catch (error) {
                console.error("Error registering user:" + error);
            }
            
        } else {
            alert('Controllare le password Inserite.')
        }

        // // setFormValues(data);

        // handleAddRegisteredUser(data);

        /* const alreadyExist = await checkUserByEmailExists(data.email);
        if(!alreadyExist) {
            AddUserData(data);
        }
        else
        {
            // alert("Already exists a user with mail " + data.email);
        } */
    };

    // Validation
    const watchAllFields = watch(); // Watch all fields for enabling the button.
    // Validation
    const isFormValid = () => {
        const isValid = watchAllFields.nome &&
        watchAllFields.cognome &&
        watchAllFields.email &&
        watchAllFields.phone &&
        watchAllFields.dataregistrazione &&
        watchAllFields.tipoutente &&
        !errors.tipoutente && // No errors on tipoutente
        !errors.nome && // No errors on name
        !errors.cognome && // No errors on cognome
        !errors.email && // No errors on email
        !errors.phone && // No errors on phone
        !errors.dataregistrazione && // No errors on datadinascita
        Object.keys(errors).length === 0;
        // console.log('errors.tipoutente: ' + errors.tipoutente);
        // console.log('isValid: ' + isValid);
        return (
            isValid
        );
    };

    return (
        <>
            <Container maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                mt: 2,
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                        </Grid>

                        <Grid item xs={12}>
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
                        </Grid>

                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: 'Password is required' }}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.password}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input {...field} id="password" type='password' />
                                <FormHelperText>{errors.password?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <Controller
                            name="confirmpassword"
                            control={control}
                            rules={{ required: 'Confirm Password is required' }}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.confirmpassword}>
                                <InputLabel htmlFor="confirmpassword">Confirma Password</InputLabel>
                                <Input {...field} id="confirmpassword" type='password' />
                                <FormHelperText>{errors.confirmpassword?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Controller
                                    name="dataregistrazione"
                                    control={control}
                                    rules={{
                                        required: 'Date of Registration is required',
                                    }}
                                    render={({ field }) => (
                                        <FormControl fullWidth error={!!errors.dataregistrazione}>
                                            <DatePicker
                                                label="Data di registrazione"
                                                value={field.value}
                                                onChange={(newValue) => field.onChange(newValue)} // Update the form state
                                                // OLD renderInput={(params) => <TextField {...params} />}
                                                slots={{ textField: (props) => <TextField {...props} /> }}
                                            />
                                            <FormHelperText>{errors.dataregistrazione?.message}</FormHelperText>
                                        </FormControl>
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
        
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary.dark"
                        sx={{ mt: 2 }}
                        disabled={!isFormValid()} // Button is disabled if the form is invalid
                        >
                        Registrati
                    </Button>

                    <Button className={styles.RegisterCancel}
                        fullWidth
                        color="error"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => router.push("/intranet")}
                    >
                        Cancel
                    </Button>
                </form>

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
