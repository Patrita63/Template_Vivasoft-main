import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {
    TextField,
    Button,
    MenuItem,
    Container,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Alert,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const CourseAndScheduleForm = () => {
    // To navigate to another page
    const router = useRouter();

    // When you refresh the page, selectedDay disappears because router.query is only available after Next.js hydrates the client-side state.
    // const { selectedDay } = router.query; // Extract the dynamic route parameter

    // To persist selectedDay across page refreshes, store it in local state (useState) and retrieve it from router.query in useEffect.
    const [selectedDay, setSelectedDay] = useState("");

    const [formData, setFormData] = useState({
        // Use Logical OR (||)
        DataInizio: selectedDay || "",
        DataFine: "",
        IdCatalogoCorsi: "",
        IdLearningCenter: "",
        ClienteFinale: "",
        Descrizione: "",
        NumeroDiscenti: "",
        IdTipoErogazione: "",
        TotaleOre: "",
        IsMTM: false,
        IsFinanziato: false,
        IsAcademy: false,
        IdStatoAgenda: "",
        Note: "",
        MailUtente: "p.tardiolobonifazi@vivasoft.it",
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    // State variables for dropdown options
    const [catalogocorsiOptions, setCatalogocorsiOptions] = useState([]);
    const [learningCenterOptions, setLearningCenterOptions] = useState([]);
    const [deliveryTypeOptions, setDeliveryTypeOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);

    // ✅ Ensure `selectedDay` is updated when `router.query.selectedDay` becomes available
    useEffect(() => {
        if (router.isReady && router.query.selectedDay) {
            setSelectedDay(router.query.selectedDay);
            setFormData((prev) => ({ ...prev, DataInizio: router.query.selectedDay }));
        }
    }, [router.isReady, router.query.selectedDay]);

    // Fetch dropdown options from API
    useEffect(() => {
        debugger;
        const fetchDropdownOptions = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/relagendacalendario/getDropdownData');
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || "Failed to load dropdown data");

                // ✅ Set dropdown options from a single API call
                setCatalogocorsiOptions(Array.isArray(data.catalogocorsiOptions) ? data.catalogocorsiOptions : []);
                setLearningCenterOptions(Array.isArray(data.learningCenterOptions) ? data.learningCenterOptions : []);
                setDeliveryTypeOptions(Array.isArray(data.deliveryTypeOptions) ? data.deliveryTypeOptions : []);
                setStatusOptions(Array.isArray(data.statusOptions) ? data.statusOptions : []);
            } catch (error) {
                console.error('Error fetching dropdown options:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDropdownOptions();
    }, []);


    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true);
        setResponseMessage(null);

        try {
            // Call the insertCourseAndSchedule function with formData
            const data = await insertCourseAndSchedule(formData);

            // Handle the response
            if (data.success) {
                setResponseMessage({
                    type: "success",
                    text: `Course created successfully!`,
                });
                router.push("/intranet/calendar")
            } else {
                setResponseMessage({
                    type: "error",
                    text: data.error || "Failed to create course.",
                });
            }
        } catch (error) {
            setResponseMessage({ type: "error", text: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    // Function to insert course and schedule
    const insertCourseAndSchedule = async (formData) => {
        const response = await fetch('/api/relagendacalendario/insertcourseandschedule', {
            method: 'POST', // Ensure this is POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                DataInizio: formData.DataInizio,
                DataFine: formData.DataFine,
                IdCatalogoCorsi: formData.IdCatalogoCorsi,
                IdLearningCenter: formData.IdLearningCenter,
                ClienteFinale: formData.ClienteFinale,
                Descrizione: formData.Descrizione,
                NumeroDiscenti: formData.NumeroDiscenti,
                IdTipoErogazione: formData.IdTipoErogazione,
                TotaleOre: formData.TotaleOre,
                IsMTM: formData.IsMTM ? 1 : 0,
                IsFinanziato: formData.IsFinanziato ? 1 : 0,
                IsAcademy: formData.IsAcademy ? 1 : 0,
                IdStatoAgenda: formData.IdStatoAgenda,
                Note: formData.Note,
                MailUtente: formData.MailUtente,
            }),
        });

        const data = await response.json();
        return data;
    };


    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
                Create a New Course and Schedule
            </Typography>

            {responseMessage && (
                <Alert severity={responseMessage.type} sx={{ mb: 3 }}>
                    {responseMessage.text}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Left Grid - Course Details */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "text.secondary" }}>
                            Course Details
                        </Typography>

                        <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            name="DataInizio"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={formData.DataInizio}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Course</InputLabel>
                            <Select name="IdCatalogoCorsi" value={formData.IdCatalogoCorsi} onChange={handleChange} required>
                                {catalogocorsiOptions?.map((option) => (
                                    <MenuItem key={option.IdCatalogoCorsi} value={option.IdCatalogoCorsi}>
                                        {option.Nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Client Name"
                            name="ClienteFinale"
                            value={formData.ClienteFinale}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select name="IdStatoAgenda" value={formData.IdStatoAgenda} onChange={handleChange} required>
                                {statusOptions.map((option) => (
                                    <MenuItem key={option.IdStatoAgenda} value={option.IdStatoAgenda}>
                                        {option.Nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Number of Students"
                            name="NumeroDiscenti"
                            type="number"
                            required
                            value={formData.NumeroDiscenti}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="Descrizione"
                            multiline
                            rows={3}
                            value={formData.Descrizione}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        {/* Back Button */}
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "green !important", color: "white", '&:hover': { backgroundColor: "darkgreen" } }}
                            disabled={loading}
                            onClick={() => router.push("/intranet/calendar")}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Back"}
                        </Button>
                    </Grid>

                    {/* Right Grid - Schedule & Additional Details */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "text.secondary" }}>
                            Schedule & Additional Details
                        </Typography>

                        <TextField
                            fullWidth
                            label="End Date"
                            type="date"
                            name="DataFine"
                            InputLabelProps={{ shrink: true }}
                            required
                            value={formData.DataFine}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Learning Center</InputLabel>
                            <Select name="IdLearningCenter" value={formData.IdLearningCenter} onChange={handleChange} required>
                                {learningCenterOptions?.map((option) => (
                                    <MenuItem key={option.IdLearningCenter} value={option.IdLearningCenter}>
                                        {option.Nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Delivery Type</InputLabel>
                            <Select name="IdTipoErogazione" value={formData.IdTipoErogazione} onChange={handleChange} required>
                                {deliveryTypeOptions?.map((option) => (
                                    <MenuItem key={option.IdTipoErogazione} value={option.IdTipoErogazione}>
                                        {option.Nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Total Hours"
                            name="TotaleOre"
                            type="number"
                            required
                            value={formData.TotaleOre}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Trainer Email"
                            name="MailUtente"
                            required
                            value={formData.MailUtente}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Notes"
                            name="Note"
                            multiline
                            rows={3}
                            value={formData.Note}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: "blue !important", color: "white", '&:hover': { backgroundColor: "darkblue" } }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Add"}
                        </Button>
                    </Grid>
                </Grid>


            </Box>
        </Container>
    );
};

export default CourseAndScheduleForm;