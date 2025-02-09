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

import { BsArrowRight } from 'react-icons/bs';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image"; // Importa l'immagine del logo
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControl, InputLabel, Input, FormHelperText, Autocomplete, FormControlLabel, FormLabel,
    CircularProgress, OutlinedInput, InputAdornment, IconButton
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
// next link
import Link from 'next/link';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Track loading state
    // To navigate to another page
    const router = useRouter();
    const [error, setError] = useState(null);

    const [message, setMessage] = useState('');

    const [listTipoUtente, setListTipoUtente] = useState([]);
    const [listRuolo, setListRuolo] = useState([]);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };
    

    // defaultValue="" // Set a default value for the field
    const initialValues = {
        nome: '',
        cognome: '',
        gender: '',
        email: '',
        phone: '',
        dataregistrazione: parseISO(format(new Date(), "yyyy-MM-dd")),  // Get the current date in ISO format (YYYY-MM-DD)
        idtipoutente: 0,
        tipoutente: '',
        password: '',
        confirmpassword: '',
        code: '',
        idruolo: 0,
        ruolo: null
    };

    // Validation
    const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    useEffect(() => {
        getAllTipoUtente();
        getAllRuolo();
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


    const sendEmail = async (fullname, mailAddress, mailSubject, mailBody) => {
        debugger;
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

    // id, nome, cognome, email, phone, dataregistrazione, idTipoUtente, password, code, idruolo
    // See RegisterData naming 
    const handleAddRegisteredUser = async (newUserData) => {
        event.preventDefault();
        setLoading(true); // Start loading spinner
        console.log("Sending data to API:", newUserData); // Log data before sending
        debugger;
        if (
            !newUserData.Nome ||
            !newUserData.Cognome ||
            !newUserData.Gender ||
            !newUserData.Email ||
            !newUserData.Phone ||
            !newUserData.DataRegistrazione ||
            !newUserData.IdTipoUtente ||
            !newUserData.Password ||
            !newUserData.Code ||
            !newUserData.IdRuolo
        ) {
            console.error("Missing required fields in registration data");
            alert("Please fill in all required fields");
            setLoading(false); // Stop loading
            return;
        }
        try {

            const response = await fetch("/api/registeruser/manageregistereduser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: newUserData.Nome,
                    cognome: newUserData.Cognome,
                    gender: newUserData.Gender,
                    email: newUserData.Email,
                    phone: newUserData.Phone,
                    dataregistrazione: newUserData.DataRegistrazione,
                    idtipoutente: newUserData.IdTipoUtente,
                    password: newUserData.Password,
                    code: newUserData.Code,
                    idruolo: newUserData.IdRuolo,
                }),
            });

            console.log("Full API response:" + response);
            console.log("Response status:" + response.status);

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Errore durante la registrazione di un nuovo utente. " + data.message);
                setLoading(false); // Stop loading
                return;
            }

            console.log("User registered successfully!");
            Cookies.set("mailregistration", newUserData.Email, { expires: 1 / 48, secure: true }); // Expires in 30 minutes
            Cookies.set("coderegistration", newUserData.Code, { expires: 1 / 48, secure: true });

            const nominativo = newUserData.Nome + ' ' + newUserData.Cognome;
            let mailSubject = '';
            if (newUserData.Gender === 'M') {
                mailSubject = 'Benvenuto ' + nominativo;
            } else {
                mailSubject = 'Benvenuta ' + nominativo;
            }
            const mailBody = `Questo è il codice da inserire nel pannello di conferma mail: ${newUserData.Code}`;
            await sendEmail(nominativo, newUserData.Email, mailSubject, mailBody);

            setLoading(false); // Stop loading

            // Redirect to ConfirmedMail page intranet
            router.push("/intranet/confirmedmail");

        } catch (err) {
            console.error("Register User Error:" + err);
            setLoading(false); // Stop loading
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleGenderChange = (event, field) => {
        const selectedGender = event.target.value;
        console.log('Selected Gender:', selectedGender); // Log the selected gender
        field.onChange(selectedGender); // Update the form state
    };

    // Validation
    const onSubmit = async (data) => {
        debugger;
        console.log('Form Data:' + data);

        if (!data.tipoutente || !data.tipoutente.id) {
            console.error("Error: tipoutente does not have an ID" + data.tipoutente);
            setLoading(false); // Stop loading
            alert("Please select a valid User Type.");
            return;
        }

        if (!data.ruolo || !data.ruolo.id) {
            console.error("Error: ruolo does not have an ID", data.ruolo);
            setLoading(false); // Stop loading
            alert("Please select a valid User Role.");
            return;
        }

        const registerUserData = new RegisterData(0, data.nome, data.cognome, data.email, data.phone, data.dataregistrazione, data.idtipoutente, data.password, 0, data.gender, data.ruolo.id);
        const isPasswordOK = registerUserData.checkPassword(data.confirmpassword);
        console.log("Register - Password Confirmed = " + isPasswordOK);

        if (isPasswordOK) {
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

                registerUserData.IdTipoUtente = data.tipoutente?.id;
                console.log('Form Data - data.tipoutente.id: ' + data.tipoutente.id);

                registerUserData.IdRuolo = data.ruolo?.id;
                console.log('Form Data - data.ruolo.id: ' + data.ruolo.id);
                handleAddRegisteredUser(registerUserData);


            } catch (error) {
                setLoading(false); // Stop loading
                console.error("Error registering user:" + error);
            }

        } else {
            setLoading(false); // Stop loading
            alert('Controllare le password Inserite.')
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
            watchAllFields.password &&
            watchAllFields.confirmpassword &&
            watchAllFields.dataregistrazione &&
            watchAllFields.tipoutente &&
            watchAllFields.ruolo &&
            !errors.ruolo && // No errors on tipoutente
            !errors.tipoutente && // No errors on tipoutente
            !errors.nome && // No errors on name
            !errors.cognome && // No errors on cognome
            !errors.gender && // No errors on gender
            !errors.email && // No errors on email
            !errors.phone && // No errors on phone
            !errors.password && // No errors on phone
            !errors.confirmpassword && // No errors on phone
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
            <div style={{ backgroundColor: "#2854A3", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Container maxWidth="sm">
                    <CssBaseline />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full mx-auto">
                        <Box sx={{ mt: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                             <Image
                                            src="/LogoClaim_F.png" // Percorso del tuo logo
                                            alt="Logo Aziendale"
                                            width={150}  // Imposta la larghezza del logo
                                            height={150} // Imposta l'altezza del logo
                                          />
                            <Typography variant="h5">Register</Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Controller
                                        name="nome"
                                        control={control}
                                        rules={{ required: 'Name is required' }}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.nome}>
                                                <InputLabel sx={{ color: "white" }} htmlFor="nome">Nome</InputLabel>
                                                <Input {...field} id="nome" InputProps={{ style: { color: "white" } }} />
                                                <FormHelperText sx={{ color: "white" }} >{errors.nome?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        name="cognome"
                                        control={control}
                                        rules={{ required: 'Surname is required' }}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.cognome}>
                                                <InputLabel sx={{ color: "white" }} htmlFor="cognome">Cognome</InputLabel>
                                                <Input {...field} id="cognome" InputProps={{ style: { color: "white" } }} />
                                                <FormHelperText>{errors.cognome?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        rules={{
                                            required: 'Gender is required',
                                        }}
                                        render={({ field }) => (
                                            <FormControl component="fieldset" error={!!errors.gender} fullWidth>
                                                <FormLabel sx={{ color: "white" }} component="legend">Gender</FormLabel>
                                                <RadioGroup
                                                    {...field}
                                                    row // Arrange options horizontally
                                                    aria-label="gender"
                                                    name="gender"
                                                    onChange={(event) => handleGenderChange(event, field)}
                                                >
                                                    <FormControlLabel sx={{ color: "white" }} value="M" control={<Radio />} label="Male" />
                                                    <FormControlLabel sx={{ color: "white" }} value="F" control={<Radio />} label="Female" />
                                                </RadioGroup>
                                                <FormHelperText>{errors.gender?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={6}>
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
                                                <InputLabel sx={{ color: "white" }} htmlFor="email">Email</InputLabel>
                                                <Input {...field} id="email" />
                                                <FormHelperText>{errors.email?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                                <InputLabel sx={{ color: "white" }} htmlFor="phone">Phone</InputLabel>
                                                <Input {...field} id="phone" />
                                                <FormHelperText>{errors.phone?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Controller
                                            name="dataregistrazione"
                                            control={control}
                                            rules={{
                                                required: 'Date of Registration is required',
                                            }}
                                            render={({ field }) => (
                                                <FormControl sx={{ color: "white" }} fullWidth error={!!errors.dataregistrazione}>
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

                                <Grid item xs={6}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "The password must be at least 8 characters, including 1 capital letter, 1 number and 1 special character",
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                message: "The password must be at least 8 characters, including 1 capital letter, 1 number and 1 special character",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.password} variant="outlined">
                                                <InputLabel sx={{ color: "white" }} htmlFor="password">Password</InputLabel>
                                                <OutlinedInput
                                                    {...field}
                                                    id="password"
                                                    type={showPassword ? "text" : "password"} // Toggle visibility
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                                <FormHelperText>{errors.password?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        name="confirmpassword"
                                        control={control}
                                        rules={{
                                            required: "Confirm Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Confirm password must be at least 8 characters, including 1 capital letter, 1 number and 1 special character",
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                message: "Confirm password must be at least 8 characters, including 1 capital letter, 1 number and 1 special character",
                                            },
                                        }}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.confirmpassword} variant="outlined">
                                                <InputLabel sx={{ color: "white" }} htmlFor="confirmpassword">Conferma Password</InputLabel>
                                                <OutlinedInput
                                                    {...field}
                                                    id="confirmpassword"
                                                    type={showConfirmPassword ? "text" : "password"} // Toggle visibility
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleToggleConfirmPassword} edge="end">
                                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                                <FormHelperText>{errors.confirmpassword?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Controller
                                        name="tipoutente"
                                        control={control}
                                        rules={{
                                            required: 'User Type is required',
                                        }}
                                        render={({ field }) => (
                                            <FormControl  fullWidth error={!!errors.tipoutente}>
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
                                                        <TextField  {...params} label="Select a User Type" />
                                                    )}

                                                />
                                                <FormHelperText sx={{ color: "white" }}>{errors.tipoutente?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="ruolo"
                                        control={control}
                                        rules={{
                                            required: 'User Role is required',
                                        }}
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.ruolo}>
                                                <Autocomplete
                                                    id="ruolo"
                                                    options={listRuolo}
                                                    getOptionLabel={(option) => option?.Ruolo || ''}
                                                    isOptionEqualToValue={(option, value) => option.Id === value?.id}
                                                    value={field.value || null}
                                                    onChange={(event, newValue) => {
                                                        field.onChange(newValue ? { id: newValue.Id, Ruolo: newValue.Ruolo } : null);
                                                    }}

                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Select a User Role" />
                                                    )}

                                                />
                                                <FormHelperText>{errors.ruolo?.message}</FormHelperText>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, mt: 2 }}>
                                {/* Registrati Button (Moved to the Left) */}
                                <Button
                                    className={styles.Register}
                                    type="submit"
                                    fullWidth
                                    disabled={!isFormValid() || loading} // Button is disabled if the form is invalid
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2, maxWidth: "150px" }} // Adjust maxWidth if needed
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : "Registrati"}
                                    {!loading && <BsArrowRight />}
                                </Button>

                                {/* Cancel Button (Moved to the Right) */}
                                <Button
                                    className={styles.RegisterCancel}
                                    fullWidth
                                    color="error"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, maxWidth: "150px" }} // Adjust maxWidth if needed
                                    onClick={() => router.push("/intranet")}
                                >
                                    Cancel
                                </Button>
                            </Box>

                        </Box>

                    </form>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            {/* https://stackoverflow.com/questions/38382153/multiple-classnames-with-css-modules-and-react */}
                            <Link className={`${styles.CenterDiv} ${styles.UnderLine}`} href={'/intranet/auth/login'}>Hai già un account? Accedi</Link>
                        </Grid>
                    </Grid>

                </Container >
            </div >
        </>
    );
}

export default Register;
