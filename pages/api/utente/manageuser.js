import getConnection from "../../../lib/dbsqlazure";

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

// 🔹 Fetch All Users or Get User by ID
async function getUsers(req, res) {
  const { id } = req.query;

  try {
    const pool = await getConnection();
    let query;
    let result;

    if (id) {
      query = `SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[IdTipoUtente],ut.[Phone]
            ,tu.TipoUtente 
            FROM T_Utente AS ut 
            INNER JOIN T_TipoUtente AS tu ON tu.Id = ut.IdTipoUtente WHERE ut.Id = @Id`;
      result = await pool.request().input("Id", id).query(query);
    } else {
      query = `SELECT ut.[Id],ut.[Nome],ut.[Cognome],ut.[Email],ut.[DataDiNascita],ut.[IdTipoUtente],ut.[Phone]
            ,tu.TipoUtente 
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
    // return res.status(500).json({ error: "Internal Server Error." });
    return res.status(500).json({ error: "Internal Server Error. " + err });
  }
}

// 🔹 Add New User
async function addUser(req, res) {
  const { nome, cognome, email, datadinascita, phone, idtipoutente } = req.body;

  if (!nome || !cognome || !email || !phone || !idtipoutente) {
    return res.status(400).json({ error: "addUser - Missing required fields" });
  }

  try {
    console.log("Connecting to database...");
    const pool = await getConnection();
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
  }
}

// Incorrect Destructuring of req.body

// You're using const { user } = req.body;, but the frontend is likely sending { id, nome, cognome, email, datadinascita, idtipoutente, phone } directly.
// Fix: Destructure req.body without user.
// 🔹 Update User
async function updateUser(req, res) {
  const { id, nome, cognome, email, datadinascita, idtipoutente, phone } = req.body; // ✅ Fix destructuring

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
      .input("Id", id) // ✅ Corrected order
      .input("Nome", nome)
      .input("Cognome", cognome)
      .input("Email", email)
      .input("DataDiNascita", datadinascita) // ✅ Ensure proper date format in frontend
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
