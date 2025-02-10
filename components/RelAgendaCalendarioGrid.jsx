import { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Typography } from "@mui/material";

import { useRouter } from 'next/router';

export default function RelAgendaCalendarioDataGrid() {
    // To navigate to another page
    const router = useRouter();
    const [relcalagendas, setRelCalAgendas] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("/api/relagendacalendario/selectinsertrelagendacalendario")
            .then((res) => res.json())
            .then((data) => {
                setRelCalAgendas(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    // Functions for button click
    const handleEdit = (row) => {
        debugger;
        if (row?.Id) {
            router.push(`/intranet/relagendacalendarioeditdetails/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const handleView = (row) => {
        if (row?.Id) {
            router.push(`/intranet/relagendacalendarioviewdetails/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };
    const handleDelete = async (row) => {
        if (row?.Id) {
            router.push(`/intranet/relagendacalendariodelete/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const columns = [
        { field: 'Id', headerName: 'ID', width: 90 },
        { field: 'IdCalendario', headerName: 'Calendario ID', width: 130 },
        { field: 'IdAgenda', headerName: 'Agenda Corsi ID', width: 130 },
        { field: 'IdStatoAgenda', headerName: 'Stato Agenda Corsi ID', width: 130 },
        { field: 'IdLearningCenter', headerName: 'Learning Center ID', width: 130 },
        { field: 'IdAula', headerName: 'ID Aula', width: 80 },
        { field: 'IdUtente', headerName: 'ID Utente', width: 80 },
        { field: 'Email', headerName: 'Email Utente', width: 180 },
        { field: 'IdTipoUtente', headerName: 'ID Tipo Utente', width: 130 },
        { field: 'TipoUtente', headerName: 'Tipo Utente', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        variant="contained"
                        // className={`${styles.BtnTopUsers} ${styles.BtnUpdateUser}`}
                        size="small"
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        // className={`${styles.BtnTopUsers} ${styles.BtnEditUser}`}
                        size="small"
                        onClick={() => handleView(params.row)}
                    >
                        View
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(params.row)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Container maxWidth={false} sx={{ mt: 4 }}>
            <Typography color="warning" variant="h4" gutterBottom>
                Rel Calendario Agenda
            </Typography>
            <Button
                // className={styles.RegisterCancel}
                fullWidth
                // color="white"
                variant="contained"
                sx={{ mt: 3, mb: 2, maxWidth: "150px" }} // Adjust maxWidth if needed
                onClick={() => router.push("/intranet/relagendacalendarioadd")}
            >
                Nuovo
            </Button>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={relcalagendas}
                    columns={columns}
                    pageSize={5}
                    loading={loading}
                    getRowId={(row) => row.Id}
                />
            </div>
        </Container>
    );
}
