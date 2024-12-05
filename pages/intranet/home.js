// Use embedded sqlite database with IndexedDB
import React, { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import localforage from 'localforage';
// https://mui.com/x/react-data-grid/
import { DataGrid } from '@mui/x-data-grid';

import { red } from '@mui/material/colors';

import { useRouter } from 'next/router';
import styles from './Home.module.css';

import Image from 'next/image';
import Link from 'next/link';

import {
    AppBar,
    Box,
    Container,
    CssBaseline,
    Toolbar,
    IconButton,
    Typography,
    Button
  } from "@mui/material";

import { AccountCircle } from '@mui/icons-material';

const Home = () => {
    // To navigate to another page
    const router = useRouter();

    const [db, setDb] = useState(null);
    const [calendarData, setCalendarData] = useState([]);
    const [error, setError] = useState(null);
    const DATABASE_NAME = 'IntranetVivasoft.sqlite';

    // https://nextjs.org/docs/messages/react-hydration-error
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

    // Initialize IndexedDB-backed SQLite
    useEffect(() => {
        // https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
        setIsAuthenticated(global?.localStorage?.getItem("isAuthenticated"));
        setUsername(global?.localStorage?.getItem("username"));
        const loadDatabase = async () => {
            try {
                const SQL = await initSqlJs({
                    locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
                });

                const savedDb = await localforage.getItem('/IntranetVivasoft.sqlite');
                let database;

                if (savedDb) {
                    console.log('Loading database from IndexedDB');
                    database = new SQL.Database(new Uint8Array(savedDb));
                } else { 
                    console.log('Loading database from public folder');
                    const response = await fetch('/IntranetVivasoft.sqlite');
                    if (!response.ok) throw new Error('Failed to fetch database file');
                    const buffer = await response.arrayBuffer();
                    database = new SQL.Database(new Uint8Array(buffer));
                } 

                setDb(database);
            } catch (err) {
                console.error('Failed to load database:', err);
                setError(err.message);
            }
        };

        loadDatabase();
    }, []);

    const getCalendarioMensile = () => {
        try {
            if (!db) throw new Error('Database not loaded');
            const tableExists = db.exec(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='T_Calendario'"
            );
            if (tableExists.length === 0) throw new Error('Table T_Calendario does not exist');

            setYear(2024);
            setMonth(12);

            const query = `
                SELECT 
                    NumeroSettimanaAnno,
                    MAX(CASE WHEN NumeroGiornoSettimana = 1 THEN Giorno ELSE NULL END) AS Sunday,
                    MAX(CASE WHEN NumeroGiornoSettimana = 2 THEN Giorno ELSE NULL END) AS Monday,
                    MAX(CASE WHEN NumeroGiornoSettimana = 3 THEN Giorno ELSE NULL END) AS Tuesday,
                    MAX(CASE WHEN NumeroGiornoSettimana = 4 THEN Giorno ELSE NULL END) AS Wednesday,
                    MAX(CASE WHEN NumeroGiornoSettimana = 5 THEN Giorno ELSE NULL END) AS Thursday,
                    MAX(CASE WHEN NumeroGiornoSettimana = 6 THEN Giorno ELSE NULL END) AS Friday,
                    MAX(CASE WHEN NumeroGiornoSettimana = 7 THEN Giorno ELSE NULL END) AS Saturday
                FROM (
                    SELECT 
                        Id,
                        Data,
                        NomeGiorno,
                        NumeroGiornoSettimana,
                        NumeroSettimanaAnno,
                        NomeMese,
                        Anno,
                        Giorno
                    FROM 
                        T_Calendario
                    WHERE 
                        Anno = ` + year + ` AND Mese = ` + month + `
                ) AS WeeklyData
                GROUP BY 
                    NumeroSettimanaAnno, NomeMese, Anno
                ORDER BY 
                    NumeroSettimanaAnno;
            `;
            // debugger;
            const result = db.exec(query);
            const rows = result[0]?.values || [];
            setCalendarData(rows.map(([NumeroSettimanaAnno,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday]) => ({ NumeroSettimanaAnno,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday })));
        } catch (err) {
            console.error('Query error:', err);
            setError(err.message);
        }
    };

    const handleLogin = () => {
       // Redirect to intranet login page
       router.push("/intranet/auth/login");
    }

   const handleLogout = () => {
        // Redirect to intranet login page
        router.push("/intranet/auth/logout");
    }

    const handleSunDayClick = (cellInfo) => {
        if(cellInfo.Sunday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Sunday} Sunday  - ${month} - ${year}`;
            alert(msg);
        }
    };
    const handleMonDayClick = (cellInfo) => {
        if(cellInfo.Monday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Monday} Monday  - ${month} - ${year}`;
            alert(msg);
        }
    };
    const handleTuesDayClick = (cellInfo) => {
        if(cellInfo.Tuesday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Tuesday} Tuesday  - ${month} - ${year}`;
            alert(msg);
        }
    };
    const handleWedDayClick = (cellInfo) => {
        if(cellInfo.Wednesday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Wednesday} Wednesday  - ${month} - ${year}`;
            alert(msg);
         }
    };
    const handleThurDayClick = (cellInfo) => {
        if(cellInfo.Thursday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Thursday} Thursday  - ${month} - ${year}`;
            alert(msg);
        }
    };
    const handleFriDayClick = (cellInfo) => {
        if(cellInfo.Friday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Friday} Friday  - ${month} - ${year}`;
            alert(msg);
        }
    };
    const handleSatDayClick = (cellInfo) => {
        if(cellInfo.Saturday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Saturday} Saturday  - ${month} - ${year}`;
            alert(msg);
        }
    };

    return ( 
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar className={styles.HomeToolbar}>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 4 }}
                        >
                        </IconButton>
                        {/* Logo azienda */}
                        {/* https://stackoverflow.com/questions/69230343/nextjs-image-component-with-fixed-witdth-and-auto-height */}
                        <div className="flex justify-center items-center">
                            {/* logo */}
                            <Link href={'/'}>
                            <Image 
                                src={'/Logo_VivaSoft.png'}
                                width={85}
                                height={20}
                                alt="Logo Vivasoft S.R.L."
                                priority={true}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            </Link>
                        </div>
                        {/* <Button color="inherit" startIcon={svgLogoIcon} className={styles.MarginRightAuto} onClick={handleHome}>Home</Button> */}

                        {/* <Stack direction="row" spacing={2}>
                            <Avatar variant="square" { ...stringAvatar('Intranet Vivasoft') } />
                        </Stack> */}
                        
                        {isAuthenticated && (
                            <>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Welcome {username}
                                </Typography>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                <AccountCircle />
                                </IconButton>
                                <Button color="inherit" className={styles.MarginLeftAuto} onClick={handleLogout}>Logout</Button>
                            </>
                        )}

                        {!isAuthenticated && (
                            <>
                                <div >
                                    <Button  color="inherit" onClick={handleLogin}>Login</Button>
                                </div>
                            </>
                        )}

                    </Toolbar>
                </AppBar>
            </Box>
            
            <div className={styles.Home}>
                <div className='container mx-auto'>
                    <h1 className='slogan'>Tecnologia + Conoscenza = Innovazione.</h1>
                </div>
                {/* <div className='flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8'>

                </div> */}
            
                <br ></br>
                <Button className={styles.BtnLoadUsers} variant="contained" onClick={getCalendarioMensile}>Calendario Mensile</Button>
                        
                <Container maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            mt: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"                
                        }}
                        >
                        
                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                        {calendarData.length > 0 && (
                            <>
                            <Box sx={{ height: 600, width: 1300 }}>
                            <div className={styles.CalendarBackgroud}>
                                <h1>Calendar for {month}/{year}</h1>
                                <table className={ styles.tableCalendar }>
                                    <thead>
                                        <tr className={ styles.tr }>
                                            <th className={ styles.th }>Week</th>
                                            <th className={ styles.thRed }>Sunday</th>
                                            <th className={ styles.th }>Monday</th>
                                            <th className={ styles.th }>Tuesday</th>
                                            <th className={ styles.th }>Wednesday</th>
                                            <th className={ styles.th }>Thursday</th>
                                            <th className={ styles.th }>Friday</th>
                                            <th className={ styles.thRed }>Saturday</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {calendarData.map((week, index) => (
                                            <tr className={ styles.tr } key={index}>
                                                <td className={ styles.td}>{week.NumeroSettimanaAnno || ''}</td>
                                                <td onClick={() => handleSunDayClick(week)} className={ styles.tdRed}>{week.Sunday || ''}</td>
                                                <td onClick={() => handleMonDayClick(week)} className={ styles.td}>{week.Monday || ''}</td>
                                                <td onClick={() => handleTuesDayClick(week)} className={ styles.td}>{week.Tuesday || ''}</td>
                                                <td onClick={() => handleWedDayClick(week)} className={ styles.td}>{week.Wednesday || ''}</td>
                                                <td onClick={() => handleThurDayClick(week)} className={ styles.td}>{week.Thursday || ''}</td>
                                                <td onClick={() => handleFriDayClick(week)} className={ styles.td}>{week.Friday || ''}</td>
                                                <td onClick={() => handleSatDayClick(week)} className={ styles.tdRed}>{week.Saturday || ''}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </Box>
                        </>)}
                    </Box>
                </Container>
            </div>
        </>
    );
}

export default Home;
