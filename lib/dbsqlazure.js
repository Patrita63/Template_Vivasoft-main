import sql from 'mssql';

const config = {
    user: process.env.NEXT_PUBLIC_AZURE_SQL_USER,       // Azure SQL username
    password: process.env.NEXT_PUBLIC_AZURE_SQL_PASS,   // Azure SQL password
    server: process.env.NEXT_PUBLIC_AZURE_SQL_SERVER,   // e.g., myserver.database.windows.net
    database: process.env.NEXT_PUBLIC_AZURE_SQL_DB,     // e.g., IntranetVivasoft
    options: {
        encrypt: true,   // Required for Azure SQL
        trustServerCertificate: false,
        enableArithAbort: true
    },
    pool: {
        max: 10, // Adjust based on load
        min: 2,
        idleTimeoutMillis: 30000, // Increase timeout
    },
    requestTimeout: 60000 // ✅ Increase SQL timeout (from 15 sec to 60 sec)
};

// Function to connect to Azure SQL
export default async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.error('Database connection failed:' + error);
        throw error;
    }
}
