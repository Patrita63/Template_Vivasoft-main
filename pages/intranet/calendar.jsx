import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styles from './Home.module.css';
import {
    Box,
    Container,
    CssBaseline,
    MenuItem, Select, FormControl, InputLabel, Button
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

    // 📌 Handle Cell Click
    const handleCellClick = (day) => {
        setSelectedDay(day);
        console.log('Selected Day:', day);
        alert(day.Day_DayNumber);
    };

    // 📌 Check User Authentication
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

    // 📌 Fetch Data When Month or Year Changes
    useEffect(() => {
        setLoading(true);
        fetchCalendarData(year, monthname)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [monthname, year]);

    const fetchCalendarData = async (year, monthname) => {
        try {
            console.log('Fetching data for:', year, monthname);
            const response = await fetch("/api/agenda/managecalendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, monthname }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
            }

            const data = await response.json();
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

                    <div className={styles.wrapperbody} style={{paddingTop: '20px'}}>
                        {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}

                        {/* 📌 Responsive Year & Month Selectors */}
                        <div className={styles.selectContainer}>
                            <FormControl className={styles.selectWrapper}>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={year}
                                    className={styles.select}
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    {years.map((yr) => (
                                        <MenuItem key={yr} value={yr}>{yr}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className={styles.selectWrapper}>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value={monthname || ""}
                                    className={styles.select}
                                    onChange={(e) => setMonthname(e.target.value)}
                                >
                                    {months.map((mo, index) => (
                                        <MenuItem key={index} value={mo}>{mo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                // className={`${styles.BtnTopUsers} ${styles.BtnUpdateUser}`}
                                size="medium"
                                onClick={() => router.push("/intranet/aggiungicorsocalendariovivasoft")}
                            >
                                Aggiungi Corso
                            </Button>
                        </div>

                        {/* 📌 Calendar Table */}
                        <Container maxWidth="md">
                            <CssBaseline />
                            <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {calendarData.length > 0 && (
                                    <Box sx={{ width: "100%", overflowX: "auto" }}>
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
