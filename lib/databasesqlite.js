// Use embedded sqlite database with IndexedDB
const localforage = require("localforage");
const initSqlJs = require("sql.js");

const fetchWithRetry = async (url, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
            return response;
        } catch (err) {
            if (attempt === retries) throw err;
            console.warn(`Retrying fetch (${attempt}/${retries})...`);
        }
    }
};

const loadDatabase = async (databasePath) => {
    if (typeof window === "undefined") {
        throw new Error("loadDatabase can only be used in the client-side environment");
    }

    try {
        // Initialize SQL.js
        const SQL = await initSqlJs({
            locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
        });

        let savedDb = await localforage.getItem(databasePath);
        // PATRIZIO Trick to get a new version of DB 
        // Ogni volta che cambio il database e faccio il primo deploy su Azure va decommentata la riga successiva.
        // Ma per salvare i dati nel DB va COMMENTATA
        // savedDb = false;   

        let database;

        if (savedDb) {
            console.log("Loading database from IndexedDB...");
            database = new SQL.Database(new Uint8Array(savedDb));
        } else {
            console.log("Fetching database from public folder...");
            const response = await fetchWithRetry(databasePath);
            const buffer = await response.arrayBuffer();
            database = new SQL.Database(new Uint8Array(buffer));

            // Save to IndexedDB for future use
            await localforage.setItem(databasePath, database.export());
            console.log("Database saved to IndexedDB");
        }

        console.log("Database loaded successfully");
        return database;
    } catch (err) {
        console.error("Error loading database:", err);
        throw err;
    }
};

export default loadDatabase;
