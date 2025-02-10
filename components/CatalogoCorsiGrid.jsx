import { useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Typography } from "@mui/material";

import { useRouter } from 'next/router';

export default function CatalogoCorsiDataGrid() {
    // To navigate to another page
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        fetch("/api/catalogocorsi/selectinsertcatalogocorsi")
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    // Functions for button click
    const handleEdit = (row) => {
        debugger;
        if (row?.Id) {
            router.push(`/intranet/catalogocorsieditdetails/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const handleView = (row) => {
        if (row?.Id) {
            router.push(`/intranet/catalogocorsiviewdetails/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };
    const handleDelete = async (row) => {
        if (row?.Id) {
            router.push(`/intranet/catalogocorsidelete/${row.Id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const columns = [
        { field: 'Id', headerName: 'ID', width: 90 },
        { field: 'NomeCorso', headerName: 'Corso', width: 200 },
        { field: 'DescrizioneCorso', headerName: 'Descrizione', width: 300 },
        { field: 'Link', headerName: 'Link', width: 150 },
        { field: 'Durata', headerName: 'Durata', width: 150 },
        { field: 'NomeTecnologia', headerName: 'Tecnologia', width: 150 },
        { field: 'NomeProvider', headerName: 'Provider', width: 150 },
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
                Catalogo Corsi Vivasoft
            </Typography>
            <Button
                // className={styles.RegisterCancel}
                fullWidth
                // color="white"
                variant="contained"
                sx={{ mt: 3, mb: 2, maxWidth: "150px" }} // Adjust maxWidth if needed
                onClick={() => router.push("/intranet/catalogocorsiadd")}
            >
                Nuovo
            </Button>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={courses}
                    columns={columns}
                    pageSize={5}
                    loading={loading}
                    getRowId={(row) => row.Id}
                />
            </div>
        </Container>
    );
}
