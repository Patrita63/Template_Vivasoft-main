import { getConnection, closeDatabaseConnection } from "../../../lib/dbsqlazure";

// Main handler function
export default async function handler(req, res) {
    console.log(req.method);
    if (req.method === "GET") {
        return await getUsers(req, res);
    } else if (req.method === "POST") {
        return await addUser(req, res);
    } else if (req.method === "PUT") {
        return await updateUser(req, res);
    } else if (req.method === "DELETE") {
        return await deleteUser(req, res);
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}

// Function to check if the email already exists in the database
async function checkUserByEmailExists(email) {
    let pool;
    try {
        pool = await getConnection(); // Establish a database connection

        const query = `SELECT COUNT(1) AS EmailExists FROM T_Utente WHERE Email = @Email`;
        
        const result = await pool
            .request()
            .input("Email", email)
            .query(query);

        const emailExists = result.recordset[0].EmailExists > 0;
        return emailExists;
    } catch (err) {
        console.error("Error checking email:", err);
        throw new Error("Error checking email existence");
    } finally {
        if (pool) {
            await closeDatabaseConnection();
        }
    }
}

// 🔹 Add New User
async function addUser(req, res) {
    const { nome, cognome, email, datadinascita, phone, idtipoutente } = req.body;

    if (!nome || !cognome || !email || !phone || !idtipoutente) {
        return res.status(400).json({ error: "addUser - Missing required fields" });
    }

    // Check if the email already exists in the database
    const emailExists = await checkUserByEmailExists(email);
    if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
    }

    let pool;
    try {
        console.log("Connecting to database...");
        pool = await getConnection(); // Establish a database connection
        console.log("Connected to database successfully!");

        const query = `
            INSERT INTO [dbo].[T_Utente] ([Nome],[Cognome],[Email],[DataDiNascita],[IdTipoUtente],[Phone]) 
            VALUES (@Nome, @Cognome, @Email, @DataDiNascita, @IdTipoUtente, @Phone)
        `;

        console.log("Executing query with data:", { nome, cognome, email, datadinascita, idtipoutente, phone });

        await pool
            .request()
            .input("Nome", nome)
            .input("Cognome", cognome)
            .input("Email", email)
            .input("DataDiNascita", datadinascita ? new Date(datadinascita).toISOString().split("T")[0] : null)
            .input("IdTipoUtente", idtipoutente)
            .input("Phone", phone)
            .query(query);

        return res.status(201).json({ message: "User added successfully" });
    } catch (err) {
        console.error("Add User Error:", err);
        return res.status(500).json({ error: "Internal Server Error: " + err });
    } finally {
        if (pool) {
            await closeDatabaseConnection();
        }
    }
}

// 🔹 Fetch All Users or Get User by ID
async function getUsers(req, res) {
    const { id } = req.query;
let pool;
    try {
        pool = await getConnection(); // Establish a database connection
        let query;
        let result;

        if (id) {
            query = `SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[IdTipoUtente],ut.[Phone], 
                    tu.TipoUtente 
                    FROM T_Utente AS ut 
                    INNER JOIN T_TipoUtente AS tu ON tu.Id = ut.IdTipoUtente WHERE ut.Id = @Id`;
            result = await pool.request().input("Id", id).query(query);
        } else {
            query = `SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[IdTipoUtente],ut.[Phone], 
                    tu.TipoUtente 
                    FROM T_Utente AS ut 
                    INNER JOIN T_TipoUtente AS tu ON tu.Id = ut.IdTipoUtente`;
            result = await pool.request().query(query);
        }

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "User(s) not found" });
        }

        return res.status(200).json({ users: result.recordset });
    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Internal Server Error. " + err });
    } finally {
        if (pool) {
            await closeDatabaseConnection();
        }
    }
}

// 🔹 Update User
async function updateUser(req, res) {
    const { id, nome, cognome, email, datadinascita, idtipoutente, phone } = req.body;

    if (!id || !nome || !cognome || !email || !datadinascita || !idtipoutente || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const pool = await getConnection();
        const query = `
            UPDATE [T_Utente]
            SET Nome = @Nome, Cognome = @Cognome, Email = @Email, 
                DataDiNascita = @DataDiNascita, IdTipoUtente = @IdTipoUtente, Phone = @Phone
            WHERE Id = @Id
        `;

        console.log("Executing Query:", query);

        await pool
            .request()
            .input("Id", id)
            .input("Nome", nome)
            .input("Cognome", cognome)
            .input("Email", email)
            .input("DataDiNascita", datadinascita)
            .input("IdTipoUtente", idtipoutente)
            .input("Phone", phone)
            .query(query);

        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.error("Update Error:", err);
        return res.status(500).json({ error: "Internal Server Error: " + err.message });
    }
}

// 🔹 Delete User
async function deleteUser(req, res) {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "deleteUser - User ID is required" });
    }

    try {
        const pool = await getConnection();
        const query = `DELETE FROM T_Utente WHERE Id = @Id`;

        await pool.request().input("Id", id).query(query);

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
