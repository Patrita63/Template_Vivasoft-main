import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Register.module.css';

import { RegisterData } from '../../Models/registerdata';
import loadDatabase from '../../lib/databasesqlite';
const localforage = require("localforage");

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
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");

    const [fullname, setFullname] = useState('');
    const [mailAddress, setMailAddress] = useState('');
    const [mailSubject, setMailSubject] = useState('');
    const [mailBody, setMailBody] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const initializeDatabase = async () => {
            
            try {
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('register.js - databasePath: ' + databasePath);
                const database = await loadDatabase(databasePath);
                setDb(database);
                console.log('database: ' + database);
                // debugger;
            } catch (err) {
                setError(err.message);
                console.log('RegisterUser - useEffect error: ' + err.message);
            }
        };

        initializeDatabase();

    }, []);


    const handleCancel = () => {
        // Redirect to home page intranet
        router.push("/intranet");
    }

    const sendEmail = async (fullname,mailAddress,mailSubject,mailBody) => {
        console.log(fullname + ' - ' + mailAddress + ' - ' +  mailSubject + ' - ' +  mailBody);
        setMessage('');
        try {
          const response = await fetch('/api/send-register-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullname,
              mailAddress,
              mailSubject,
              mailBody
            }),
          });
    
          const result = await response.json();
    
          if (response.ok) {
            setMessage('Email sent successfully!');
          } else {
            setMessage(`Failed to send email: ${result.error || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error:', error.message);
          setMessage('An unexpected error occurred. Please try again.');
        }
    
    };

    const handleRegister = async () => {

        const registerUserData = new RegisterData(name, surname, email, password, confirmpassword, address);
        const isPasswordOK = registerUserData.checkPassword();
        console.log("Register - Password Confirmed = " + isPasswordOK);
        debugger;

        setFullname('Patrizio Tardiolo Bonifazi');
        setMailAddress('p.tardiolobonifazi@vivasoft.it');
        setMailSubject('Benvenuto ' + name + ' ' + surname);
        setMailBody('Questo è il codice da inserire nel pannello di conferma mail: abcd1234');

        if(isPasswordOK){
            
            if (!db) {
                console.error('Database is not initialized');
                return;
            }
    
            try {
                
                // Check if the user is already registered
                const checkUser = db.exec(`SELECT * FROM T_Register WHERE Email = '${email}'`);
                console.log('handleRegister - ' + `SELECT * FROM T_Register WHERE Email = '${email}'`);
        
                if (!checkUser || checkUser.length === 0) {
                    // Register the user
                    const query = `
                        INSERT INTO [T_Register]
                            ([Name]
                            ,[Surname]
                            ,[Email]
                            ,[Password]
                            ,[Address]
                            ,[Code])
                        VALUES
                            ('${name}'
                            ,'${surname}'
                            ,'${email}'
                            ,'${password}'
                            ,'${address}'
                            ,'')`;
                    db.run(query);
                    console.log("User registered successfully.");
            
                    // ✅ Save the updated database back to IndexedDB
                    const updatedDb = db.export();
                    const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                    console.log('handleRegister - databasePath: ' + databasePath);
                    await localforage.setItem(databasePath, updatedDb);
                    console.log("Database saved to IndexedDB after registration");

                    await sendEmail(fullname,mailAddress,mailSubject,mailBody);
            
                    // Redirect to ConfirmedMail page intranet
                    router.push("/intranet/confirmedmail");
                } else {
                    console.log('handleRegister - User already exists: ' + checkUser)
                }
        
            } catch (error) {
                console.error("Error registering user:", error);
            }
            
        }

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
                        name="surname"
                        required
                        fullWidth
                        id="surname"
                        label="Surname"
                        autoFocus
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
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
