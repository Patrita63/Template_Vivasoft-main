import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from 'next/router';
import { useLookups } from "../context/LookupsContext";

const AgendaDataGrid = () => {
    // To navigate to another page
    const router = useRouter();
    const [agendas, setAgendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { lookups, setLookups } = useLookups();
    const [lookupsLoaded, setLookupsLoaded] = useState(false); // ✅ Prevent infinite loop
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        IdLearningCenter: false, // ✅ Hide this column
    });

    useEffect(() => {
        const fetchLookups = async () => {
            if (!lookupsLoaded) {  // ✅ Fetch only once
                try {
                    const response = await fetch("/api/agenda/retrieveaccessorytables");
                    const data = await response.json();
                    setLookups(data.lookups);
                    setLookupsLoaded(true);
                } catch (error) {
                    console.error("Error fetching lookups:", error);
                }
            }
        };

        fetchLookups();
    }, [lookupsLoaded, setLookups]);

    useEffect(() => {
        if (lookupsLoaded) {  // ✅ Fetch data only after lookups are loaded
            fetchData();
        }
    }, [lookupsLoaded]); // ✅ Depend on `lookupsLoaded` to avoid infinite loop

    const fetchData = async () => {
        fetch("/api/agenda/selectinsertagenda")
            .then((res) => res.json())
            .then((data) => {
                setAgendas(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    };

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

    const formatDate = (dateString) => {
        return dateString.split('T')[0]; // Extracts YYYY-MM-DD
    };

    const getDatesBetween = (startDate, endDate) => {
        let dates = [];
        let currentDate = new Date(startDate);
        let stopDate = new Date(endDate);

        while (currentDate <= stopDate) {
            dates.push(currentDate.toISOString().split('T')[0]); // Format YYYY-MM-DD
            currentDate.setDate(currentDate.getDate() + 1); // Move to next day
        }

        return dates;
    };

    const addEventToCalendar = async (row) => {
        if (row?.Id) {
            debugger;
            const idAgendaCorsi = row.Id;
            // TODO prendere inizio e fine corso e ciclare sui giorni per aggiungere un record in T_RelAgendaCorsiCalendario
            // INSERT INTO [dbo].[T_RelAgendaCorsiCalendario]
            // ([IdAgendaCorsi]
            // ,[IdCalendario]
            // ,[IdLearningCenter]
            // ,[IdAula]
            // ,[IdUtente])
            // VALUES
            // (<IdAgendaCorsi, int,>
            // ,<IdCalendario, int,>
            // ,<IdLearningCenter, int,>
            // ,<IdAula, int,>
            // ,<IdUtente, int,>)
            const datainizio = formatDate(row.DataInizio);  // YYYYMMDD
            const datafine = formatDate(row.DataFine);
            const courseDays = getDatesBetween(datainizio, datafine);
            console.log("Course Days:", courseDays);

            // Example: Finding `IdCalendario` for each day from lookups
            const idCalendarioList = courseDays.map(day => {
                return lookups?.calendario?.find(cal => formatDate(cal.Data) === day)?.Id || null;
            });

            console.log("Selected Calendar IDs:", idCalendarioList);

            // const idCalendario = 0;
            // TODO
            // SELECT [Id] AS IdCalendario
            // FROM [dbo].[T_Calendario]
            // WHERE [Data] = '2024-01-03'

            const idLearningCenter = row.IdLearningCenter;

            // const idAula = 0;
            // SELECT [Id] AS IdAula
            // FROM [dbo].[T_Aula]
            // WHERE IdLearningCenter = 1

            // const idUtente = 0;  // Mi ci metto come trainer
            // SELECT [Id] AS IdUtente
            // FROM [dbo].[T_Utente]
            // WHERE Email = 'p.tardiolobonifazi@vivasoft.it'

            // Fetch Aula (Assuming it is linked to Learning Center)
            const idAula = lookups?.aula?.find(aula => aula.IdLearningCenter === idLearningCenter)?.Id || null;

            // Fetch Trainer User ID (Placeholder Logic)
            const idUtente = lookups?.utente?.find(user => user.Email === 'p.tardiolobonifazi@vivasoft.it')?.Id || null;

            console.log({
                idAgendaCorsi,
                idCalendarioList,
                idLearningCenter,
                idAula,
                idUtente,
            });

            // Here, insert the event into the DB
            // (Use API call to send these values)

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
        { field: "IdLearningCenter", headerName: "ID Learning Center", width: 50 },
        { field: "LearningCenter", headerName: "Learning Center", width: 200 },
        { field: "StatoAgenda", headerName: "Stato", width: 150 },
        { field: "TipoErogazione", headerName: "Tipo Erogazione", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 450,
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
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => addEventToCalendar(params.row)}
                    >
                        Aggiungi Evento
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, maxWidth: "250px" }}
                    onClick={() => router.push("/intranet/agendacorsiadd")}
                >
                    Nuovo Corso
                </Button>
            </Box>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={agendas}
                    columns={columns}
                    pageSize={5}
                    loading={loading}
                    getRowId={(row) => row.Id}
                    columnVisibilityModel={columnVisibilityModel} // ✅ Hide columns dynamically
                    onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                />
            </div>
        </Container>
    );
};

export default AgendaDataGrid;
