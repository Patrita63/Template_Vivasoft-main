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
    Grid
} from '@mui/material';

const EditAgendaCorsiForm = ({ initialData, onSubmit }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Agenda Corsi
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Id"
                            name="Id"
                            value={formData.Id || ''}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Data Inizio"
                            name="DataInizio"
                            type="datetime-local"
                            value={formData.DataInizio || ''}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Data Fine"
                            name="DataFine"
                            type="datetime-local"
                            value={formData.DataFine || ''}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Id Catalogo Corsi</InputLabel>
                            <Select
                                name="IdCatalogoCorsi"
                                value={formData.IdCatalogoCorsi || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Catalog 1</MenuItem>
                                <MenuItem value={2}>Catalog 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Id Learning Center</InputLabel>
                            <Select
                                name="IdLearningCenter"
                                value={formData.IdLearningCenter || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Center 1</MenuItem>
                                <MenuItem value={2}>Center 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Cliente Finale"
                            name="ClienteFinale"
                            value={formData.ClienteFinale || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Descrizione"
                            name="Descrizione"
                            value={formData.Descrizione || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Numero Discenti"
                            name="NumeroDiscenti"
                            type="number"
                            value={formData.NumeroDiscenti || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Id Tipo Erogazione</InputLabel>
                            <Select
                                name="IdTipoErogazione"
                                value={formData.IdTipoErogazione || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Type 1</MenuItem>
                                <MenuItem value={2}>Type 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Totale Ore"
                            name="TotaleOre"
                            type="number"
                            value={formData.TotaleOre || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox name="IsMTM" checked={formData.IsMTM || false} onChange={handleChange} />}
                            label="Is MTM"
                        />
                        <FormControlLabel
                            control={<Checkbox name="IsFinanziato" checked={formData.IsFinanziato || false} onChange={handleChange} />}
                            label="Is Finanziato"
                        />
                        <FormControlLabel
                            control={<Checkbox name="IsAcademy" checked={formData.IsAcademy || false} onChange={handleChange} />}
                            label="Is Academy"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Note"
                            name="Note"
                            value={formData.Note || ''}
                            onChange={handleChange}
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" onClick={() => router.push("/intranet/agendacorsi")}>
                        Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditAgendaCorsiForm;
