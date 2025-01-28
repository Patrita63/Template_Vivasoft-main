import { useState, useEffect } from 'react';

import NavIntranetMenu from '../../components/NavIntranetMenu';
import DynamicBreadCrumbs from '../../components/DynamicBreadCrumbs';

import {
    Box,
    Container,
    CssBaseline,
    Button
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import styles from './AllRegisteredUsers.module.css';

import { useRouter } from 'next/router';

import Cookies from "js-cookie";

// next link
// import Link from 'next/link';
// import { red } from '@mui/material/colors';

// I have DataDiNascita in this format 2000-01-01T00:00:00.000Z but i want display only  in this format 'yyyy-MM-dd'
// Since your DataDiNascita is in ISO format (2000-01-01T00:00:00.000Z), you need to convert and display it in yyyy-MM-dd format.
import { format, parseISO } from "date-fns";

const AllRegistereUsers = () => {

    // To navigate to another page
    const router = useRouter();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const [isDataReady, setIsDataReady] = useState(false);

    const [isClient, setIsClient] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    // Stops Checking When Component Unmounts (clearInterval)
    useEffect(() => {
        // getAllRegisteredUsers 
        const getAllRegisteredUsers = async () => {
            try {
                const response = await fetch('/api/registeruser/manageregistereduser', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
                });
        
                const data = await response.json();
                debugger;
        
                if (!response.ok) {
                setError(data.message || "Errore durante getAllRegisteredUsers");
                return;
                }

                // Ensure `users` exists and is an array
                if (!Array.isArray(data?.users)) {
                    throw new Error("Unexpected API response: 'users' field is not an array");
                }
                console.log(data?.users);
                // Correct mapping function
                const rows = data.users.map(({ Id, Nome, Cognome, Email, DataRegistrazione, IdTipoUtente, TipoUtente, IdRuolo, Ruolo, Phone, Password, Code, Note }) => {
                    const row = {
                        id: Id,  // MUI DataGrid needs this field
                        nome: Nome,
                        cognome: Cognome,
                        email: Email,
                        dataregistrazione: formattedDate(DataRegistrazione),
                        idtipoutente: IdTipoUtente, // This will display the IdTipoUtente 
                        tipoutente: TipoUtente,  // This will display the TipoUtente name
                        idruolo: IdRuolo,        // This will display the IdRuolo 
                        ruolo: Ruolo,            // This will display the Ruolo name
                        phone: Phone,
                        password: Password,
                        code: Code,
                        note: Note
                    };
                    console.log("Mapped Row:" + row);  // Debug each row
                    return row;
                });
                
                setData(rows);
                setIsDataReady(true);
        
            } catch (err) {
                setIsDataReady(false);
                console.error('Error fetching getAllRegisteredUsers:' + err);
                
                setError(err.message);
                console.error("Error during getAllRegisteredUsers:" + err);
            }
        }
        getAllRegisteredUsers();

        setIsClient(true); // This ensures the component knows it's running on the client
        const checkAuth = () => {
            const auth = Cookies.get("isAuthenticated") === "true"; // Convert to boolean
            const user = Cookies.get("username");
            const role = Cookies.get("role");
            setIsAuthenticated(auth);
            setUsername(user || "");
            setRole(role || "");
        };
    
        checkAuth(); // Run once when component mounts
    
        const interval = setInterval(checkAuth, 1000); // Check cookies every second
    
        return () => clearInterval(interval); // Cleanup on unmount
        
    }, []);

    // Ensure the date is parsed correctly before setting it
    const formattedDate = (dateString) => {
        if (!dateString) return ""; // Handle empty/null values
        return format(parseISO(dateString), "yyyy-MM-dd");
    };

    if (error) return <div>Error: {error}</div>;
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'nome', headerName: 'Nome', width: 150, editable: true },
        { field: 'cognome', headerName: 'Cognome', width: 250, editable: true },
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        { field: 'phone', headerName: 'Phone', width: 150, editable: true },
        { field: 'password', headerName: 'Password', width: 150, editable: true },
        { field: 'code', headerName: 'Code', width: 150, editable: true },
        { field: 'dataregistrazione', headerName: 'Data Di Registrazione YMD', sortable: true, width: 150 },
        { field: 'idtipoutente', headerName: 'Id Tipo Utente', type: 'number', width: 50, editable: false },
        { field: 'tipoutente', headerName: 'Tipo Utente', sortable: true, width: 150, editable: true },
        { field: 'idruolo', headerName: 'Id Ruolo Utente', type: 'number', width: 50, editable: false },
        { field: 'ruolo', headerName: 'Ruolo Utente', sortable: true, width: 150, editable: true },
        { field: 'note', headerName: 'Note', sortable: true, width: 150, editable: true },
        {
            field: 'action',
            headerName: 'Action',
            width: 450,
            sortable: false,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        variant="contained"
                        className={`${styles.BtnTopUsers} ${styles.BtnUpdateUser}`}
                        size="small"
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        className={`${styles.BtnTopUsers} ${styles.BtnEditUser}`}
                        size="small"
                        onClick={() => handleView(params.row)}
                    >
                        View
                    </Button>
                    <Button
                        variant="contained"
                        className={`${styles.BtnTopUsers} ${styles.BtnDeleteUser}`}
                        size="small"
                        onClick={() => handleDelete(params.row)}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    // Functions for button click
    const handleEdit = (row) => {
        if (row?.id) {
            router.push(`/intranet/registereduserdetails/${row.id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const handleView = (row) => {
        if (row?.id) {
            router.push(`/intranet/viewregistereduserdetails/${row.id}`);
        } else {
            console.error('Row ID is missing');
        }
    };

    const handleDelete = (row) => {
        if (row?.id) {
            router.push(`/intranet/deleteregistereduser/${row.id}`);
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
                                <Box sx={{ width: 1500, background: '#abca79' }}>
                                    <DataGrid
                                        autoHeight
                                        rows={data}
                                        columns={columns}
                                        initialState={{
                                        pagination: {
                                            paginationModel: {
                                            pageSize: 10,
                                            },
                                        },
                                        }}
                                        pageSizeOptions={[5,10,25,50,100]}
                                        disableColumnMenu
                                        disableSelectionOnClick
                                        // checkboxSelection
                                        // disableRowSelectionOnClick
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

export default AllRegistereUsers;

