import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Typography } from "@mui/material";

import { useRouter } from 'next/router';

const AgendaDataGrid = () => {
    // To navigate to another page
    const router = useRouter();
    const [agendas, setAgendas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/agenda/selectinsertagenda")
            .then((res) => res.json())
            .then((data) => {
                setAgendas(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    // Functions for button click
    const handleEdit = (row) => {
        debugger;
        if (row?.Id) {
            router.push(`/intranet/agendacorsieditdetails/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const handleView = (row) => {
        if (row?.Id) {
            router.push(`/intranet/agendacorsiviewdetails/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };
    const handleDelete = async (row) => {
        if (row?.Id) {
            router.push(`/intranet/agendacorsidelete/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const columns = [
        { field: "Id", headerName: "ID", width: 50 },
        { field: "DataInizio", headerName: "Inizio Corso", width: 100 },
        { field: "DataFine", headerName: "Fine Corso", width: 100 },
        { field: "NomeCorso", headerName: "Nome Corso", width: 200 },
        { field: "Durata", headerName: "Durata", width: 60 },
        { field: "LearningCenter", headerName: "Learning Center", width: 200 },
        { field: "StatoAgenda", headerName: "Stato", width: 150 },
        { field: "TipoErogazione", headerName: "Tipo Erogazione", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
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
                Agenda Corsi Vivasoft
            </Typography>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={agendas}
                    columns={columns}
                    pageSize={5}
                    loading={loading}
                    getRowId={(row) => row.Id}
                />
            </div>
        </Container>
    );
};

export default AgendaDataGrid;
