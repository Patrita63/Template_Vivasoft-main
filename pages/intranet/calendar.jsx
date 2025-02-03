import React, { useState, useEffect } from 'react';

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

import { AccountCircle, Bolt } from '@mui/icons-material';
// import { Underdog } from 'next/font/google';

import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';

import Cookies from "js-cookie";

const CalendarVivasoft = () => {
    // https://nextjs.org/docs/messages/react-hydration-error
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    // To navigate to another page
    const router = useRouter();
    const [calendarData, setCalendarData] = useState([]);
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

        const checkAuth = () => {
            const auth = Cookies.get("isAuthenticated") === "true"; // Convert to boolean
            const user = Cookies.get("username");
            const role = Cookies.get("role");
            setIsAuthenticated(auth);
            setUsername(user || "");
            setRole(role || "");
        };

        checkAuth(); // Run once when component mounts

        const monthNumber = getMonthNumber(currentMonth);
        getCalendarioMensile(currentYear, monthNumber);
    }, []);

    // Solution: Map Over Objects Instead of Arrays
    const getCalendarioMensile = async (year, month) => {
        try {
            const response = await fetch("/api/agenda/managecalendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, month }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Errore durante la handleDataCalendar: ${errorData.message}`);
            }

            const data = await response.json();
            console.log("Fetched Data:", data); // Debugging

            if (!data.datacalendar || !Array.isArray(data.datacalendar)) {
                setMessage('No calendar data found. Please try again.');
                setCalendarData([]); // Reset the state to an empty array
                return;
            }
            debugger;
            const calendarArray = Array.isArray(data.datacalendar) ? data.datacalendar : [];
            console.log("Converted calendarData:", calendarArray);

            if (calendarArray.length > 0) {
                setCalendarData(calendarArray);
                setMessage('');
            } else {
                setMessage('No data available for the selected month and year.');
                setCalendarData([]); // Reset state if empty
            }

        } catch (err) {
            console.error("Error fetching calendar:", err);
            setError(`Error: ${err.message}`);
            setMessage('');
            setCalendarData([]); // Reset state on error
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
        if (cellInfo.Sunday != null) {
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Sunday} Sunday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleMonDayClick = (cellInfo) => {
        if (cellInfo.Monday != null) {
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Monday} Monday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleTuesDayClick = (cellInfo) => {
        if (cellInfo.Tuesday != null) {
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Tuesday} Tuesday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleWedDayClick = (cellInfo) => {
        if (cellInfo.Wednesday != null) {
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Wednesday} Wednesday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleThurDayClick = (cellInfo) => {
        if (cellInfo.Thursday != null) {
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Thursday} Thursday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleFriDayClick = (cellInfo) => {
        if (cellInfo.Friday != null) {
            const msg = `Week Number: ${cellInfo.NumeroSettimanaAnno}` + ` - ${cellInfo.Friday} Friday  - ${month} - ${year}`;
            // alert(msg);
        }
    };

    const handleSatDayClick = (cellInfo) => {
        if (cellInfo.Saturday != null) {
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
            <Box sx={{ margin: '16px' }}>
                <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
            </Box>

            {isAuthenticated && (
                <>

                    <div className={styles.wrapperbody}>
                        {/* <div className='container mx-auto'>
                            <h1 className='slogan'>Tecnologia + Conoscenza = Innovazione.</h1>
                        </div>
                        <br ></br> */}

                        {message && <p style={{color: 'red', fontWeight: 'bold' }}>{message}</p>}
                        <br ></br>
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
                        </>
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
                                                <table className={styles.tableCalendar}>
                                                    <thead>
                                                        <tr className={styles.tr}>
                                                            <th className={styles.th}>Week</th>
                                                            <th className={styles.thRed}>Sunday</th>
                                                            <th className={styles.th}>Monday</th>
                                                            <th className={styles.th}>Tuesday</th>
                                                            <th className={styles.th}>Wednesday</th>
                                                            <th className={styles.th}>Thursday</th>
                                                            <th className={styles.th}>Friday</th>
                                                            <th className={styles.thRed}>Saturday</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {calendarData.map((week, index) => (
                                                            <tr className={styles.tr} key={index}>
                                                                <td className={styles.td}>{week.NumeroSettimanaAnno || ''}</td>
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
