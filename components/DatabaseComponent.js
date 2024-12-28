import React, { useState, useEffect } from "react";
import loadDatabase from "../lib/databasesqlite";

// N.B.
// This component uses loadDatabase to load the database, ensuring it only runs on the client side by using useEffect.

const DatabaseComponent = () => {
    const [db, setDb] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                const databasePath = process.env.NEXT_PUBLIC_DATABASE_SQLITE; // || "/default_database.sqlite";
                console.log('DatabaseComponent - databasePath: ' + databasePath);
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

    return <div>Database loaded successfully!</div>;
};

export default DatabaseComponent;
