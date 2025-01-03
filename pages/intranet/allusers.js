
import { useState, useEffect } from 'react';
import loadDatabase from '../../lib/databasesqlite';

import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';

import {
    Box,
    Container,
    CssBaseline,
    Button,
    Typography
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import styles from './AllUsers.module.css';

import { useRouter } from 'next/router';

// next link
import Link from 'next/link';
// import { red } from '@mui/material/colors';

const AllUsers = () => {

    // To navigate to another page
    const router = useRouter();
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [isDataReady, setIsDataReady] = useState(false);

    const [isClient, setIsClient] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        setIsClient(true); // This ensures the component knows it's running on the client
         // https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
         setIsAuthenticated(global?.localStorage?.getItem("isAuthenticated"));
         setUsername(global?.localStorage?.getItem("username"));

        const initializeDatabase = async () => {
            
            try {
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('intranet\index.js - databasePath: ' + databasePath);
                const database = await loadDatabase(databasePath);
                setDb(database);

                if(database){
                    const query = 'SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[IdTipoUtente],ut.[Phone],tu.TipoUtente FROM T_Utente AS ut INNER JOIN T_TipoUtente AS tu ON tu.Id = ut.IdTipoUtente';
                    const result = database.exec(query);
                    const rows = result[0]?.values || [];
                    setData(rows.map(([id, nome, cognome, email,datadinascita,idtipoutente,phone,tipoutente]) => ({ id, nome, cognome, email, datadinascita, idtipoutente, phone, tipoutente })));
                    
                    setIsDataReady(true);
                }
                
            } catch (err) {
                setIsDataReady(false);
                setError(err.message);
            }
        };

        initializeDatabase();
        
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!db){
        return <div>Loading database...</div>;
    } 
    const fetchUsers = () => {
        try {
            if (!db) throw new Error('Database not loaded');
            const tableExists = db.exec(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='T_Utente'"
            );
            if (tableExists.length === 0) throw new Error('Table T_Utente does not exist');
            // const query = 'SELECT * FROM T_Utente';
            const query = 'SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[IdTipoUtente],tu.TipoUtente,tu.Phone FROM T_Utente AS ut INNER JOIN T_TipoUtente AS tu ON tu.Id = ut.IdTipoUtente';
            const result = db.exec(query);
            const rows = result[0]?.values || [];
            setData(rows.map(([id, nome, cognome, email,datadinascita,idtipoutente,tipoutente,phone]) => ({ id, nome, cognome, email, datadinascita, idtipoutente, tipoutente, phone })));
            setIsDataReady(true);
        } catch (err) {
            setIsDataReady(false);
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
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
          },
        {
          field: 'datadinascita',
          headerName: 'Data Di Nascita',
          sortable: true,
          width: 150,
        },
        {
            field: 'idtipoutente',
            headerName: 'Id Tipo Utente',
            type: 'number',
            width: 50,
            editable: false,
        },
        {
            field: 'tipoutente',
            headerName: 'Tipo Utente',
            sortable: true,
            width: 150,
            editable: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            sortable: false,
            renderCell: (params) => (
            <Button
                variant="contained"
                className={styles.BtnLoadUsers}
                size="small"
                onClick={() => handleButtonClick(params.row)}
            >
                Edit
            </Button>
            )
        }
    ];

    // Function for button click
    const handleButtonClick = (row) => {
        if (row?.id) {
            router.push(`/intranet/userdetails/${row.id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    return (
        <>
            {/* NavIntranetMenu */}
            {isClient && (
                <div>
                    <NavIntranetMenu />
                </div>
            )}
            {/* Breadcrumbs */}
            <Box sx={{ margin: '16px' } }>
            <DynamicBreadCrumbs className={styles.MarginTop} aria-label="breadcrumb" />
            </Box>
            {isAuthenticated && (
            <>
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
                    
                    {!isDataReady && (
                        <>
                        <Typography variant="h4">Embedded SQLite with Next.js</Typography>
                
                        <br ></br>
                        <Button className={styles.BtnLoadUsers} variant="contained" onClick={fetchUsers}>Load Users</Button>
                        </>
                    )}
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
                                <Box sx={{ height: 600, width: 1350, background: '#abca79' }}>
                                    {data.length > 0 && (
                                        <Link className={`${styles.LeftDiv} ${styles.UnderLine}`} href={'/intranet/adduser'}>Add a new User</Link>
                                    )}
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
            </>
            )}
        </>
    );
}

export default AllUsers;

