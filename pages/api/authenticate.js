// pages/api/authenticate.js
import { getConnection, closeDatabaseConnection } from "../../lib/dbsqlazure";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required" });
    }

    let pool;
    try {
        pool = await getConnection(); // Establish a database connection

        const query = `
            SELECT [Id], [Nome], [Cognome], [Email], [Phone],
                   [DataRegistrazione], [IdTipoUtente], [Password], [Code], Gender 
            FROM [T_Register]
            WHERE Email = @Email AND Password = @Password
        `;

        const result = await pool
            .request()
            .input("Email", email)
            .input("Password", password)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result.recordset[0];
        delete user.Password;

        return res.status(200).json({ user });

    } catch (err) {
        console.error("❌ Login Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (pool) {
            await closeDatabaseConnection();
        }
    }
}
