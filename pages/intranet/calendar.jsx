// import dynamic from "next/dynamic";
// // N.B. 
// // Next.js provides a way to disable SSR for specific components using dynamic imports. 
// // This is particularly useful for client-only code like the loadDatabase function.
// // This ensures that DatabaseComponent (and the loadDatabase function within it) is only executed on the client side.

// const DynamicDatabaseComponent = dynamic(() => import('../../components/DatabaseComponent'), {
//     ssr: false, // Disable server-side rendering
// });

// const HomePage = () => {
//     return (
//         <div>
//             <h1>SQLite Database Loader</h1>
//             <DynamicDatabaseComponent />
//         </div>
//     );
// };

// export default HomePage;

// Use embedded sqlite database with IndexedDB
import React, { useState, useEffect } from 'react';
import getConnection from '../../lib/dbsqlazure';

// https://mui.com/x/react-data-grid/
// import { DataGrid } from '@mui/x-data-grid';

// import { red } from '@mui/material/colors';

import { useRouter } from 'next/router';
import styles from './Home.module.css';

import {
    Box,
    Container,
    CssBaseline,
    MenuItem, Select, FormControl, InputLabel,
    Button
  } from "@mui/material";

import { AccountCircle } from '@mui/icons-material';
// import { Underdog } from 'next/font/google';

import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';

const CalendarVivasoft = () => {
    // https://nextjs.org/docs/messages/react-hydration-error
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    // To navigate to another page
    const router = useRouter();
    const [calendarData, setCalendarData] = useState([]);
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

    const [message, setMessage] = useState('');

    const [isClient, setIsClient] = useState(false);

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const currentYear = new Date().getFullYear(); // Get the current year
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // new Date().getMonth(); // Get current month (0-11)
    const currentMonth = months[new Date().getMonth()]; // Get current month name

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear); // Set default year

    const getMonthNumber = (monthName) => {
        const index = months.indexOf(monthName);
        return index !== -1 ? index + 1 : null;
    };

    useEffect(() => {
        setIsClient(true); // This ensures the component knows it's running on the client

        // https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
        setIsAuthenticated(global?.localStorage?.getItem("isAuthenticated"));
        setUsername(global?.localStorage?.getItem("username"));
        
        const initializeDatabase = async () => {
            try {
                setMessage('Please wait');
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('intranet\calendar.js - databasePath: ' + databasePath);
                const database = await loadDatabase(databasePath);
                setDb(database);
                setMessage('Database ready to use');
            } catch (err) {
                setMessage('Failed to load database: '+ err);
                setError(err.message);
            }
        };

        initializeDatabase();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!db) return <div>Loading database...</div>;

    const getCalendarioMensile = async () => {
        
        try {
            if (!db) throw new Error('Database not loaded');
            const tableExists = db.exec(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='T_Calendario'"
            );
            if (tableExists.length === 0) throw new Error('Table T_Calendario does not exist');

            // setYear(2024);
            // setMonth(12);

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
                        Anno = ` + year + ` AND Mese = ` + getMonthNumber(month) + `
                ) AS WeeklyData
                GROUP BY 
                    NumeroSettimanaAnno, NomeMese, Anno
                ORDER BY 
                    NumeroSettimanaAnno;
            `;
            // debugger;
            console.log('getCalendarioMensile - query' + query);
            const result = await db.exec(query);
            const rows = result[0]?.values || [];
            console.log(rows.length);
            if(rows.length > 0){
                setCalendarData(rows.map(([NumeroSettimanaAnno,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday]) => ({ NumeroSettimanaAnno,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday })));
                setMessage('');
            } else {
                setMessage('Please retry to load data.');
            }

        } catch (err) {
            console.error('Query error:'+ err);
            setMessage('Query error:'+ err);
            setError(err.message);
        }
    };

    const isToday = (dateString) => {
        // console.log('dateString: ' + dateString);
        // Parse the input date string
        const inputDate = new Date(dateString);

        // console.log('inputDate: ' + inputDate);
        
        // Get today's date
        const today = new Date();
        // Check if year, month, and date are the same
        return (
            inputDate.getFullYear() === today.getFullYear() &&
            inputDate.getMonth() === today.getMonth() &&
            inputDate.getDate() === today.getDate()
        );
    };

    const handleSunDayClick = (cellInfo) => {
        if(cellInfo.Sunday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Sunday} Sunday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleMonDayClick = (cellInfo) => {
        if(cellInfo.Monday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Monday} Monday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleTuesDayClick = (cellInfo) => {
        if(cellInfo.Tuesday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Tuesday} Tuesday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleWedDayClick = (cellInfo) => {
        if(cellInfo.Wednesday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Wednesday} Wednesday  - ${month} - ${year}`;
            // alert(msg);
         }
    };

    const handleThurDayClick = (cellInfo) => {
        if(cellInfo.Thursday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Thursday} Thursday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleFriDayClick = (cellInfo) => {
        if(cellInfo.Friday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Friday} Friday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleSatDayClick = (cellInfo) => {
        if(cellInfo.Saturday != null){
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Saturday} Saturday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

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
            
            {isAuthenticated && (
            <>
                <div className={styles.wrapperbody}>
                    {/* <div className='container mx-auto'>
                        <h1 className='slogan'>Tecnologia + Conoscenza = Innovazione.</h1>
                    </div>
                    

                    <br ></br> */}
                    {message && <p>{message}</p>}
                    <br ></br>  
                
                    { (message === "Database ready to use" || message === 'Please retry to load data.') &&
                        <>
                            <div style={{ display: "flex", marginLeft: "625px", gap: "20px", alignItems: "center" }}>
                                {/* Year Select */}
                                <FormControl style={{ minWidth: 120 }}>
                                <InputLabel>Year</InputLabel>
                                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                                    {years.map((yr) => (
                                    <MenuItem key={yr} value={yr}>{yr}</MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                        
                                {/* Month Select */}
                                <FormControl style={{ minWidth: 120 }}>
                                <InputLabel>Month</InputLabel>
                                <Select value={month} onChange={(e) => setMonth(e.target.value)}>
                                    {months.map((mo, index) => (
                                    <MenuItem key={index} value={mo}>{mo}</MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </div>
                            <br></br>
                            <Button className={styles.BtnLoadUsers} variant="contained" onClick={getCalendarioMensile}>
                                Visualizza Calendario Mensile
                            </Button>
                        </>
                    }
                    
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
                                    <h1>Calendar of {month}/{year}</h1>
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
                                                    <td onClick={() => handleSunDayClick(week)} className={`${styles.tdRed} ${isToday(`${year}-${month}-${week.Sunday}`) ? styles.today : ''}`}>
                                                        {week.Sunday || ''}
                                                    </td>
                                                    <td onClick={() => handleMonDayClick(week)} className={`${styles.td} ${isToday(`${year}-${month}-${week.Monday}`) ? styles.today : ''}`}>
                                                        {week.Monday || ''}
                                                    </td>
                                                    <td onClick={() => handleTuesDayClick(week)} className={`${styles.td} ${isToday(`${year}-${month}-${week.Tuesday}`) ? styles.today : ''}`}>
                                                        {week.Tuesday || ''}
                                                    </td>
                                                    <td onClick={() => handleWedDayClick(week)} className={`${styles.td} ${isToday(`${year}-${month}-${week.Wednesday}`) ? styles.today : ''}`}>
                                                        {week.Wednesday || ''}
                                                    </td>
                                                    <td onClick={() => handleThurDayClick(week)} className={`${styles.td} ${isToday(`${year}-${month}-${week.Thursday}`) ? styles.today : ''}`}>
                                                        {week.Thursday || ''}
                                                    </td>
                                                    <td onClick={() => handleFriDayClick(week)} className={`${styles.td} ${isToday(`${year}-${month}-${week.Friday}`) ? styles.today : ''}`}>
                                                        {week.Friday || ''}
                                                    </td>
                                                    <td onClick={() => handleSatDayClick(week)} className={`${styles.tdRed} ${isToday(`${year}-${month}-${week.Saturday}`) ? styles.today : ''}`}>
                                                        {week.Saturday || ''}
                                                    </td>
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
            )}
        </>
    );
}

export default CalendarVivasoft;
