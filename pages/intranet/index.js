
import { useState, useEffect } from 'react';
import loadDatabase from '../../lib/databasesqlite';

import {
    Box,
    Container,
    CssBaseline,
    Button,
    Typography
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import styles from './Home.module.css';

export default function Home() {
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('intranet\index.js - databasePath: ' + databasePath);
                const database = await loadDatabase(databasePath);
                setDb(database);
            } catch (err) {
                setError(err.message);
            }
        };

        initializeDatabase();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!db) return <div>Loading database...</div>;

    const fetchUsers = () => {
        try {
            if (!db) throw new Error('Database not loaded');
            const tableExists = db.exec(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='T_Utente'"
            );
            if (tableExists.length === 0) throw new Error('Table T_Utente does not exist');
            // const query = 'SELECT * FROM T_Utente';
            const query = 'SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[IdTipoUtente],tu.TipoUtente FROM T_Utente AS ut INNER JOIN T_TipoUtente AS tu ON tu.Id = ut.IdTipoUtente';
            const result = db.exec(query);
            const rows = result[0]?.values || [];
            setData(rows.map(([id, nome, cognome, email,datadinascita,idtipoutente,tipoutente]) => ({ id, nome, cognome, email, datadinascita, idtipoutente, tipoutente })));
        } catch (err) {
            console.error('Query error:', err);
            setError(err.message);
        }
    };

    /* const addUser = async () => {
        if (!db) return;
        // Insert a new user
        db.run(`
            INSERT INTO T_Utente (nome, cognome, email)
            VALUES ('John', 'Doe', 'john.doe@example.com');
        `);
        await saveDatabase(); // Save changes to IndexedDB
        fetchUsers();
    };
 */
    /* const saveDatabase = async () => {
        if (!db) return;
        const data = db.export(); // Export as Uint8Array
        await localforage.setItem('IntranetVivasoft.sqlite', data);
        console.log('Database saved to IndexedDB');
    }; */

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
          field: 'nome',
          headerName: 'Nome',
          width: 150,
          editable: true,
        },
        {
          field: 'cognome',
          headerName: 'Cognome',
          width: 250,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 250,
          editable: true,
        },
        {
          field: 'datadinascita',
          headerName: 'Data Di Nascita',
          sortable: true,
          width: 150,
          // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        {
            field: 'idtipoutente',
            headerName: 'Id Tipo Utente',
            type: 'number',
            width: 150,
            editable: false,
        },
        {
            field: 'tipoutente',
            headerName: 'Tipo Utente',
            sortable: true,
            width: 150,
            editable: true,
        }
    ];

    return (
        // <div>
        //     <h1>Embedded SQLite with Next.js</h1>
        //     <button onClick={fetchUsers}>Load Users</button>
        //     <button onClick={addUser}>Add User</button>
        //     <ul>
        //         {data.map((user) => (
        //             <li key={user.id}>
        //                 {user.nome} {user.cognome} ({user.email})
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div className={styles.wrapperbody}>
            <Box
                sx={{
                mt: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%"
                }}
            >
                
                <Typography variant="h4">Embedded SQLite with Next.js</Typography>
            
                <br ></br>
                <Button className={styles.BtnLoadUsers} variant="contained" onClick={fetchUsers}>Load Users</Button>
                        
                <Container maxWidth="xs" height="100%" >
                    <CssBaseline />
                    <Box
                        sx={{
                            mt: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "100%"            
                        }}
                        >
                        
                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                        {data.length > 0 && (
                            <>
                            <Box sx={{ height: 600, width: 1300, background: '#abca79' }}>
                                <DataGrid
                                    rows={data}
                                    columns={columns}
                                    initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 5,
                                        },
                                    },
                                    }}
                                    pageSizeOptions={[5]}
                                    // checkboxSelection
                                    disableRowSelectionOnClick
                                />
                            </Box>
                        </>)}
                    </Box>
                </Container>
            </Box>
        </div>
    );
}
