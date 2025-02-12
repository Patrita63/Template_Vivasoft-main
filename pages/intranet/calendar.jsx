import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import styles from './Home.module.css';
import {
    Box,
    Container,
    CssBaseline,
    MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';
import CalendarTable from '../../components/CalendarioCorsi';
import Cookies from "js-cookie";

const CalendarVivasoft = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const router = useRouter();
    const [calendarData, setCalendarData] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    const currentYear = new Date().getFullYear();
    const months = useMemo(() => [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ], []);
    const [monthname, setMonthname] = useState(months[new Date().getMonth()]);

    const [year, setYear] = useState(currentYear);

    const [selectedDay, setSelectedDay] = useState(null);

    // 📌 Function to handle actions when a cell is clicked
    const handleCellClick = (day) => {
        setSelectedDay(day);
        debugger;
        console.log('handleCellClick - Selected data: ',day);
        alert(day.Day_DayNumber);
    };

    useEffect(() => {
        setIsClient(true);
        const checkAuth = () => {
            const auth = Cookies.get("isAuthenticated") === "true";
            setIsAuthenticated(auth);
            setUsername(Cookies.get("username") || "");
            setRole(Cookies.get("role") || "");
        };
        checkAuth();

    }, []);

    useEffect(() => {
        setLoading(true);
        fetchCalendarData(year, monthname)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [monthname, year]);


    const fetchCalendarData = async (year, monthname) => {
        debugger;
        try {
            debugger;
            console.log('fetchCalendarData - getmonthnameName', monthname); // e.g., "February"
            const response = await fetch("/api/agenda/managecalendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, monthname }),
            });
            // doesn't arrive here
            console.log("API Response Status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
            }
            const data = await response.json();
            debugger;
            setCalendarData(data.datacalendar || []);
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <>
            {isClient && <NavIntranetMenu />}
            <Box sx={{ margin: '16px' }}>
                <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
            </Box>
            {isAuthenticated && (
                <>
                    {error && <p style={{ color: "red" }}>Error: {error}</p>}
                    {loading && <p>Loading data...</p>}
                    <div className={styles.wrapperbody}>
                        {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}
                        <div style={{ display: "flex", marginLeft: "625px", gap: "20px", alignItems: "center" }}>
                            <FormControl style={{ minWidth: 120 }}>
                                <InputLabel>Year</InputLabel>
                                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                                    {years.map((yr) => (
                                        <MenuItem key={yr} value={yr}>{yr}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl style={{ minWidth: 120 }}>
                                <InputLabel>Month</InputLabel>
                                <Select value={monthname || ""} onChange={(e) => setMonthname(e.target.value)}>
                                    {months.map((mo, index) => (
                                        <MenuItem key={index} value={mo}>{mo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Container maxWidth="xs">
                            <CssBaseline />
                            <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                                {calendarData.length > 0 && (
                                    <Box sx={{ height: 600, width: 1300 }}>
                                        <div className="p-4">
                                            <h1 className="text-xl font-bold mb-4">Calendar {monthname} {year}</h1>
                                            <CalendarTable data={calendarData} onCellClick={handleCellClick} />
                                        </div>
                                    </Box>
                                )}
                            </Box>
                        </Container>
                    </div>
                </>
            )}
        </>
    );
};

export default CalendarVivasoft;
