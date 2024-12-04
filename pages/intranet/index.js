// Use embedded sqlite database with IndexedDB
import { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import localforage from 'localforage';
// https://mui.com/x/react-data-grid/
import Box from '@mui/material/Box';

import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function Home() {
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const DATABASE_NAME = 'IntranetVivasoft.sqlite';

    useEffect(() => {
        const loadDatabase = async () => {
            try {
                const SQL = await initSqlJs({
                    locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
                });

                // const savedDb = await localforage.getItem('IntranetVivasoft.sqlite');
                let database;

                /* if (savedDb) {
                    console.log('Loading database from IndexedDB');
                    database = new SQL.Database(new Uint8Array(savedDb));
                } else { */
                    console.log('Loading database from public folder');
                    const response = await fetch('/IntranetVivasoft.sqlite');
                    if (!response.ok) throw new Error('Failed to fetch database file');
                    const buffer = await response.arrayBuffer();
                    database = new SQL.Database(new Uint8Array(buffer));
                /* } */

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

            const result = db.exec('SELECT * FROM T_Utente');
            const rows = result[0]?.values || [];
            setData(rows.map(([id, nome, cognome, email,datadinascita,idtipoutente]) => ({ id, nome, cognome, email, datadinascita, idtipoutente })));
        } catch (err) {
            console.error('Query error:', err);
            setError(err.message);
        }
    };

    /* const fetchUsers = () => {
        debugger;
        if (!db) return;

        const resultTable = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name='T_Utente'");
        if (resultTable.length === 0) {
            throw new Error('Table T_Utente does not exist');
        }
        // Query the database
        const result = db.exec('SELECT * FROM T_Utente');
        if (result.length) {
            const rows = result[0].values.map(([id, nome, cognome, email, datadinascita, idtipoutente]) => ({
                id,
                nome,
                cognome,
                email,
                datadinascita, 
                idtipoutente
            }));
            setData(rows);
        }
    }; */

    const addUser = async () => {
        if (!db) return;
        // Insert a new user
        db.run(`
            INSERT INTO T_Utente (nome, cognome, email)
            VALUES ('John', 'Doe', 'john.doe@example.com');
        `);
        await saveDatabase(); // Save changes to IndexedDB
        fetchUsers();
    };

    const saveDatabase = async () => {
        if (!db) return;
        const data = db.export();
        await localforage.setItem(DATABASE_NAME, data);
        console.log('Database saved to IndexedDB');
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
          field: 'nome',
          headerName: 'Nome',
          width: 100,
          editable: true,
        },
        {
          field: 'cognome',
          headerName: 'Cognome',
          width: 150,
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
          width: 110,
          // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        {
            field: 'idtipoutente',
            headerName: 'Id Tipo Utente',
            type: 'number',
            width: 50,
            editable: false,
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
        <div>
            
            <h1>Embedded SQLite with Next.js</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <Button onClick={fetchUsers}>Load Users</Button>
            {data.length > 0 && (
                <>
                <Box sx={{ height: 400, width: '100%' }}>
                
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
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                    
                </Box>
            </>)}
            
        </div>
    );
}
