import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';

const EditAgendaCorsiForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState({
        DataInizio: "",
        DataFine: "",
        IdCatalogoCorsi: "",
        IdLearningCenter: "",
        IdStatoAgenda: "",
        IdTipoErogazione: "",
        TotaleOre: "",
        NumeroDiscenti: "",
        IsMTM: 0,
        IsFinanziato: 0,
        IsAcademy: 0,
        ClienteFinale: "",
        Descrizione: "",
        Note: "",
    });

    const [isFetching, setIsFetching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    // State to track if data has been loaded
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [catalogocorsiOptions, setCatalogocorsiOptions] = useState([]);
    const [learningCenterOptions, setLearningCenterOptions] = useState([]);
    const [deliveryTypeOptions, setDeliveryTypeOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);

    // Fetch existing data when the component mounts
    useEffect(() => {
        if (!router.isReady || !id) return;

        const fetchCourseById = async () => {
            setIsFetching(true);
            try {
                const response = await fetch(`/api/agenda/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    setResponseMessage({ type: "error", text: data.error || "Failed to load course data" });
                    return;
                }

                if (!data.dataAgenda || Object.keys(data.dataAgenda).length === 0) {
                    setResponseMessage({ type: "error", text: "No data found for this course." });
                    return;
                }

                console.log("✅ Setting formData:", data.dataAgenda); // ✅ Log before setting state
                // Update formData with fetched data
                setFormData({
                    ...data.dataAgenda, // Merge API data
                    IsMTM: Boolean(data.dataAgenda.IsMTM),
                    IsFinanziato: Boolean(data.dataAgenda.IsFinanziato),
                    IsAcademy: Boolean(data.dataAgenda.IsAcademy),
                });

                // // Mark data as loaded
                // setIsDataLoaded(true);
                // // setFormData(data.dataAgenda); // ✅ Correctly set form data
                // setFormData((prevData) => ({
                //     ...prevData, // Preserve default values
                //     ...data.dataAgenda, // Merge API data
                // }));

                // Mark data as loaded
                setIsDataLoaded(true);
            } catch (error) {
                console.error("Network error:", error);
                setResponseMessage({ type: "error", text: "Network error. Please try again." });
            } finally {
                setIsFetching(false);
            }
        };

        fetchCourseById();
    }, [router.isReady, id]);

    useEffect(() => {
        const fetchDropdownOptions = async () => {
            setIsFetching(true);
            try {
                const response = await fetch("/api/agenda/retrieveaccessorytables");
                const data = await response.json();

                if (!response.ok) throw new Error("Failed to fetch dropdown options");

                setCatalogocorsiOptions(data.catalogocorsiOptions || []);
                setLearningCenterOptions(data.learningCenterOptions || []);
                setDeliveryTypeOptions(data.deliveryTypeOptions || []);
                setStatusOptions(data.statusOptions || []);
            } catch (error) {
                console.error("Error fetching dropdown options:", error);
                setResponseMessage({ type: "error", text: "Failed to load dropdown options." });
            } finally {
                setIsFetching(false);
            }
        };

        fetchDropdownOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage(null);

        try {
            const response = await fetch(`/api/agenda/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setResponseMessage({ type: "success", text: "Course updated successfully!" });
                router.push("/intranet/agendacorsi");
            } else {
                setResponseMessage({ type: "error", text: data.error || "Failed to update course." });
            }
        } catch (error) {
            setResponseMessage({ type: "error", text: "Network error. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Agenda Corsi ({id})
            </Typography>
            {responseMessage && (
                <Alert severity={responseMessage.type} sx={{ mb: 2 }}>
                    {responseMessage.text}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    {/* Render form fields only if data is loaded */}
                    {isDataLoaded && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Start Date"
                                    type="date"
                                    name="DataInizio"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    value={formData.DataInizio ? formData.DataInizio.split('T')[0] : ""}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="End Date"
                                    type="date"
                                    name="DataFine"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    value={formData.DataFine ? formData.DataFine.split('T')[0] : ""}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Course</InputLabel>
                                    <Select
                                        name="IdCatalogoCorsi"
                                        value={formData?.IdCatalogoCorsi || ""} // ✅ Ensure value is always set
                                        onChange={handleChange}
                                        required
                                    >
                                        {catalogocorsiOptions?.map((option) => (
                                            <MenuItem key={option.IdCatalogoCorsi} value={option.IdCatalogoCorsi}>
                                                {option.Nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Learning Center</InputLabel>
                                    <Select
                                        name="IdLearningCenter"
                                        value={formData?.IdLearningCenter || ""} // ✅ Ensure value is always set
                                        onChange={handleChange}
                                        required
                                    >
                                        {learningCenterOptions?.map((option) => (
                                            <MenuItem key={option.IdLearningCenter} value={option.IdLearningCenter}>
                                                {option.Nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="IdStatoAgenda"
                                        value={formData?.IdStatoAgenda || ""} // ✅ Ensure value is always set
                                        onChange={handleChange}
                                        required
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem key={option.IdStatoAgenda} value={option.IdStatoAgenda}>
                                                {option.Nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>Delivery Type</InputLabel>
                                    <Select
                                        name="IdTipoErogazione"
                                        value={formData?.IdTipoErogazione || ""} // ✅ Ensure value is always set
                                        onChange={handleChange}
                                        required
                                    >
                                        {deliveryTypeOptions?.map((option) => (
                                            <MenuItem key={option.IdTipoErogazione} value={option.IdTipoErogazione}>
                                                {option.Nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Totale Ore"
                                    name="TotaleOre"
                                    type="number"
                                    value={formData?.TotaleOre || ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Numero Discenti"
                                    name="NumeroDiscenti"
                                    type="number"
                                    value={formData?.NumeroDiscenti || ''}
                                    onChange={handleChange}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={<Checkbox name="IsMTM"
                                        checked={Boolean(formData?.IsMTM)} // ✅ Ensures correct boolean conversion
                                        onChange={handleChange} />}
                                    label="Is MTM"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="IsFinanziato"
                                        // checked={formData?.IsFinanziato || false} 
                                        checked={Boolean(formData?.IsFinanziato)}
                                        onChange={handleChange} />}
                                    label="Is Finanziato"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        name="IsAcademy"
                                        checked={Boolean(formData?.IsAcademy)}
                                        onChange={handleChange} />}
                                    label="Is Academy"
                                />
                                <TextField
                                    fullWidth
                                    label="Cliente Finale"
                                    name="ClienteFinale"
                                    value={formData?.ClienteFinale || ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Descrizione"
                                    name="Descrizione"
                                    value={formData?.Descrizione || ""}
                                    onChange={handleChange}
                                    multiline  // Allows multi-line text input
                                    rows={3}   // Sets a minimum height
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Note"
                                    name="Note"
                                    value={formData?.Note || ''}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "green !important", color: "white", '&:hover': { backgroundColor: "darkgreen" } }}
                        disabled={isFetching || isSubmitting}
                        onClick={() => router.push("/intranet/agendacorsi")}
                    >
                        {isFetching || isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Back"}
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: "blue !important", color: "white", '&:hover': { backgroundColor: "darkblue" } }}
                        disabled={isFetching || isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save changes"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditAgendaCorsiForm;