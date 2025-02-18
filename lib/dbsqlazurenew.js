import sql from 'mssql';

// Configuration for Azure SQL
const config = {
    user: process.env.NEXT_PUBLIC_AZURE_SQL_USER,       // Azure SQL username
    password: process.env.NEXT_PUBLIC_AZURE_SQL_PASS,   // Azure SQL password
    server: process.env.NEXT_PUBLIC_AZURE_SQL_SERVER,   // e.g., myserver.database.windows.net
    database: process.env.NEXT_PUBLIC_AZURE_SQL_DB,     // e.g., IntranetVivasoft
    options: {
        encrypt: true,   // Required for Azure SQL
        trustServerCertificate: false, // Required for Azure SQL
        enableArithAbort: true, // Recommended for Azure SQL
    },
    pool: {
        max: 10, // Adjust based on load
        min: 2, // Minimum number of connections in the pool
        idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    },
    requestTimeout: 60000, // Increase SQL timeout (from 15 sec to 60 sec)
};

// Global connection pool
let pool;

// Function to connect to Azure SQL
export async function getConnection() {
    try {
        if (!pool) {
            console.log('Creating new connection pool...');
            pool = await sql.connect(config);
        }
        return pool;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

// Function to close the connection pool
export async function closeDatabaseConnection() {
    try {
        if (pool) {
            console.log('Closing connection pool...');
            await pool.close();
            pool = null; // Reset the pool
        }
    } catch (err) {
        console.error('Error closing connection pool:', err);
        throw err;
    }
}

// Function to execute a SQL query
export async function executeQuery(query, params = []) {
    let connection;
    try {
        connection = await getConnection();

        // Create a prepared statement
        const request = new sql.Request(connection);
        
        // Add parameters if provided
        params.forEach((param) => {
            request.input(param.name, param.type, param.value);
        });

        // Execute the query
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        // Do not close the connection here; let the pool manage it
    }
}

// Function to execute a stored procedure
export const executeStoredProcedure = async (storedProcedure, params = []) => {
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
};