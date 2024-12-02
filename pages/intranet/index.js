// Use embedded sqlite database with IndexedDB
import { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import localforage from 'localforage';

export default function Home() {
    const [db, setDb] = useState(null);
    const [data, setData] = useState([]);
    const DATABASE_NAME = 'IntranetVivasoft.sqlite';

    useEffect(() => {
        const loadDatabase = async () => {
            try {
                // Initialize SQL.js
                const SQL = await initSqlJs({
                    locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
                });

                // Load the database from IndexedDB or the public folder
                const savedDb = await localforage.getItem(DATABASE_NAME);
                let database;
                debugger;
                if (savedDb) {
                    // Load database from IndexedDB
                    database = new SQL.Database(new Uint8Array(savedDb));
                    console.log('Database loaded from IndexedDB');
                } else {
                    // Fetch database from the public folder
                    const response = await fetch(`/IntranetVivasoft.sqlite`);
                    /* const buffer = await response.arrayBuffer();
                    database = new SQL.Database(new Uint8Array(buffer));
                    console.log('Database loaded from file'); */

                    if (!response.ok) throw new Error('Failed to fetch database file');
                    const buffer = await response.arrayBuffer();

                    // Load SQLite database
                    database = new SQL.Database(new Uint8Array(buffer));
                }
                setDb(database);
            } catch (error) {
                console.error('Failed to load database:', error);
            }
        };

        loadDatabase();
    }, []);

    const fetchUsers = () => {
        if (!db) return;
        // Query the database
        const result = db.exec('SELECT * FROM T_Utente');
        if (result.length) {
            const rows = result[0].values.map(([id, nome, cognome, email]) => ({
                id,
                nome,
                cognome,
                email,
            }));
            setData(rows);
        }
    };

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

    return (
        <div>
            <h1>Embedded SQLite with Next.js</h1>
            <button onClick={fetchUsers}>Load Users</button>
            <button onClick={addUser}>Add User</button>
            <ul>
                {data.map((user) => (
                    <li key={user.id}>
                        {user.nome} {user.cognome} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}
