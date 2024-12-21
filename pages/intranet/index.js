// Use embedded sqlite database with IndexedDB
import { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import localforage from 'localforage';
// https://mui.com/x/react-data-grid/
import {
    Box,
    Container,
    CssBaseline
} from '@mui/material';

import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import styles from './Home.module.css';

export default function Home() {
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const DATABASE_SQLITE = '/IntranetVivasoft.sqlite';

    useEffect(() => {
        const loadDatabase = async () => {
            setError(null);
            // debugger;
            // console.log('process.env: ' + process.env);
            let databasePath = process.env.REACT_APP_DATABASE_SQLITE;
            console.log("Database Path from process.env.REACT_APP_DATABASE_SQLITE: " + databasePath);
            console.log("DATABASE_SQLITE:" + DATABASE_SQLITE);
            if(databasePath === undefined){
                databasePath = DATABASE_SQLITE;
                console.log("Database Path (DATABASE_SQLITE): ", databasePath);
            }

            try {
                const SQL = await initSqlJs({
                    locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
                });

                const savedDb = await localforage.getItem(databasePath);
                let database;

                if (savedDb) {
                    console.log('Loading database from IndexedDB');
                    database = new SQL.Database(new Uint8Array(savedDb));
                } else { 
                    console.log('Loading database from public folder');
                    const response = await fetch(databasePath);
                    if (!response.ok) throw new Error('Failed to fetch database file');
                    const buffer = await response.arrayBuffer();
                    database = new SQL.Database(new Uint8Array(buffer));
                } 

                setDb(database);
            } catch (err) {
                console.error('Failed to load database:', err);
                setError(err.message);
            }
        };

        loadDatabase();

    }, []);

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
    const saveDatabase = async () => {
        if (!db) return;
        const data = db.export(); // Export as Uint8Array
        await localforage.setItem('IntranetVivasoft.sqlite', data);
        console.log('Database saved to IndexedDB');
    };

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
        <div className={styles.Home}>
            <h1>Embedded SQLite with Next.js</h1>
            <br ></br>
            <Button className={styles.BtnLoadUsers} variant="contained" onClick={fetchUsers}>Load Users</Button>
                    
            <Container maxWidth="xs" >
                <CssBaseline />
                <Box
                    sx={{
                        mt: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"                
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
        </div>
    );
}
