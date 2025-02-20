import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styles from './Home.module.css';
import {
    Box,
    Container,
    CssBaseline,
    MenuItem, Select, FormControl, InputLabel, Button,
    Modal, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';

import CalendarTable from '../../components/CalendarioCorsi';
import Cookies from "js-cookie";

// N.B. Imports for footer with statcounter
import Credits from "../../components/Credits";
import Image from 'next/image';
import Script from "next/script"; // Import Script from next

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

    // Popup to shows events
    const [open, setOpen] = useState(false);
    const [dayEventsData, setDayEventsData] = useState([]);

    // 📌 Handle Cell Click
    // Clicking on a day cell passes the full event array.
    // onClick={() => dayEvents.length > 0 && onCellClick(dayEvents)}
    const handleCellClick = (dayEvents) => {
        debugger;

        setSelectedDay(dayEvents[0].Day_Date.split("T")[0]);
        let messageEvent = '';
        if (dayEvents[0].IdAgendaCorsi === null) {
            messageEvent = 'No Events for selected day: ' + dayEvents[0].Day_Date.split("T")[0];

            // alert(messageEvent);
            setDayEventsData(dayEvents);
            setOpen(true);
        } else {
            if (dayEvents.length > 1) {
                messageEvent = 'There are ' + dayEvents.length + ' events for selected day: ' + dayEvents[0].Day_Date.split("T")[0];
            } else {
                messageEvent = 'There is ' + dayEvents.length + ' event for selected day: ' + dayEvents[0].Day_Date.split("T")[0];
            };
            setDayEventsData(dayEvents);
            setOpen(true);
        }

        console.log(messageEvent);
        console.log(selectedDay);

    };

    const PopupGrid = ({ open, onClose }) => {
        return (
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 900,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    {dayEventsData[0]?.IdAgendaCorsi > 0 ? (
                        <>
                            {/* <Typography variant="h6" gutterBottom style={{ backgroundColor: "yellow" }}> But better */}
                            <Typography variant="h6" gutterBottom sx={{ bgcolor: "yellow", p: 1 }}>
                                <strong >Events on: {dayEventsData[0]?.Day_DayNumber} {dayEventsData[0]?.Day_MonthName} {dayEventsData[0]?.Day_Year}</strong>
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id Course Agenda</TableCell>
                                            <TableCell>Course name</TableCell>
                                            <TableCell>Learning center</TableCell>
                                            <TableCell>Num. of student(s)</TableCell>
                                            <TableCell>Type of erogation</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Course duration (Day(s))</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dayEventsData.map((row) => (
                                            <TableRow key={row.IdAgendaCorsi}>
                                                <TableCell>{row.IdAgendaCorsi}</TableCell>
                                                <TableCell>{row.NomeCorso}</TableCell>
                                                <TableCell>{row.LearningCenter}</TableCell>
                                                <TableCell>{row.NumeroDiscenti}</TableCell>
                                                <TableCell>{row.TipoErogazione}</TableCell>
                                                <TableCell>{row.StatoAgenda}</TableCell>
                                                <TableCell>{row.DurataCorso}</TableCell>
                                                {/* ✅ Wrap Buttons in a Box to enable Flexbox */}
                                                <TableCell>
                                                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{ bgcolor: "green !important", color: "white", '&:hover': { bgcolor: "darkgreen" } }}
                                                        >
                                                            View
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{ bgcolor: "blue !important", color: "white", '&:hover': { bgcolor: "darkblue" } }}
                                                            onClick={() => router.push(`/intranet/aggiungicorsocalendariovivasoft?selectedDay=${selectedDay}`)}
                                                        >
                                                            Add
                                                        </Button>

                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{ bgcolor: "red !important", color: "white", '&:hover': { bgcolor: "darkred" } }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" gutterBottom>
                                No Events for selected day: {selectedDay}
                            </Typography>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ bgcolor: "blue !important", color: "white", '&:hover': { bgcolor: "darkblue" } }}
                                onClick={() => router.push(`/intranet/aggiungicorsocalendariovivasoft?selectedDay=${selectedDay}`)}
                            >
                                Add event
                            </Button>
                        </>
                    )}
                    <Box mt={2} textAlign="right">
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ backgroundColor: "red !important", color: "white", '&:hover': { backgroundColor: "darkred" } }}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        );
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

                    <div className={styles.wrapperbody} style={{ paddingTop: '20px' }}>
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
                        </div>

                        {/* 📌 Calendar Table */}
                        <Container maxWidth="md">
                            <CssBaseline />
                            <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {calendarData.length > 0 && (
                                    <Box sx={{ width: "100%", overflowX: "auto" }}>
                                        <div className="p-4">
                                            <h1 className="text-xl font-bold mb-4">📆 Calendar Vivasoft → {monthname} {year}</h1>
                                            <CalendarTable data={calendarData} onCellClick={handleCellClick} />
                                        </div>
                                    </Box>
                                )}
                            </Box>
                        </Container>
                        <PopupGrid open={open} onClose={() => setOpen(false)} />
                    </div>
                </>
            )}

            {/* Footer */}
            <footer className={styles.footer}>
                <Credits />
                {/* Statcounter Section */}
                <div className="flex justify-center items-center space-x-2 mt-4 p-2 rounded-lg shadow-md">
                    <a title="Web Analytics Made Easy - Statcounter" href="https://statcounter.com/" target="_blank">
                        <span className="mr-1 text-white">Vivasoft&apos;s Stats Dashboard:</span>
                    </a>
                    <Image
                        width={60}
                        height={14}
                        src="https://c.statcounter.com/13084256/0/7bd27416/0/"
                        alt="Statcounter tracking"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-24 h-auto rounded-lg"
                    />
                </div>

                {/* Noscript Fallback */}
                <noscript>
                    <div className="statcounter">
                        <a title="Web Analytics Made Easy - Statcounter" href="https://statcounter.com/" target="_blank">
                            <Image className="statcounter"
                                width={60}
                                height={14}
                                src="https://c.statcounter.com/13084256/0/7bd27416/0/"
                                alt="Web Analytics Made Easy - Statcounter"
                                referrerPolicy="no-referrer-when-downgrade" />
                        </a>
                    </div>
                </noscript>
            </footer>

            {/* Statcounter Script */}
            <Script
                strategy="lazyOnload"
                src="https://www.statcounter.com/counter/counter.js"
            />
        </>
    );
};

export default CalendarVivasoft;
