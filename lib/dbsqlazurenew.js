import sql from 'mssql';

// Configuration for Azure SQL
const config = {
    user: process.env.AZURE_SQL_USER,       // Secure server-side environment variables
    password: process.env.AZURE_SQL_PASS,
    server: process.env.AZURE_SQL_SERVER,  
    database: process.env.AZURE_SQL_DB,   
    options: {
        encrypt: true,  // Required for Azure SQL
        trustServerCertificate: false,
        enableArithAbort: true, 
    },
    pool: {
        max: 10, // Increase if needed (e.g., max: 20 for high-load applications)
        min: 2, // Keep some connections open
        idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    },
    requestTimeout: 60000, // Increase timeout to avoid slow query issues
};

// Global connection pool
let pool;

// Function to connect to Azure SQL with error handling
export async function getConnection() {
    try {
        if (!pool || !pool.connected) {
            console.log('Creating new connection pool...');
            pool = await sql.connect(config);
        } else {
            console.log('Using existing connection pool...');
        }
        return pool;
    } catch (error) {
        console.error('Database connection failed:', error);

        // If pool is broken, reset it to allow reconnection
        pool = null;
        throw error;
    }
}

// Function to close the connection pool properly
export async function closeDatabaseConnection() {
    try {
        if (pool) {
            console.log('Closing connection pool...');
            await pool.close();
            pool = null; // Reset the pool after closing
        }
    } catch (err) {
        console.error('Error closing connection pool:', err);
        throw err;
    }
}

// Function to execute a SQL query
export async function executeQuery(query, params = []) {
    try {
        const pool = await getConnection(); // Ensure connection is active
        const request = pool.request(); // Create a request

        // Add parameters dynamically
        params.forEach((param) => {
            request.input(param.name, param.type, param.value);
        });

        // Execute the query
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}

// Function to execute a stored procedure
export async function executeStoredProcedure(storedProcedure, params = []) {
    try {
        const pool = await getConnection();
        const request = pool.request();

        // Add parameters dynamically
        params.forEach(param => {
            request.input(param.name, param.type, param.value);
        });

        // Execute the stored procedure
        const result = await request.execute(storedProcedure);
        return result.recordset;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}
