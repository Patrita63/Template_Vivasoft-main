import getConnection from "../../../lib/dbsqlazure";

// If email and code are provided in the POST request, assume the request is for checking user registration.
// If all parameters required for adding a user are provided, assume the request is for user creation.

// Use precise conditional checks to avoid unintended operation mismatches.
export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getUsers(req, res);
  } else if (req.method === "POST") {
    const { email, code, nome, cognome, phone, dataregistrazione, idtipoutente, password } = req.body;

    if (email && code && !nome && !cognome && !phone && !dataregistrazione && !idtipoutente && !password) {
      // Check if user is registered
      return await checkUserRegistered(req, res);
    } else if (nome && cognome && email && phone && dataregistrazione && idtipoutente && password && code) {
      // Add a new user
      return await addUser(req, res);
    } else {
      return res.status(400).json({ error: "Invalid parameters provided" });
    }
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
      query = `SELECT * FROM [T_Register] WHERE Id = @Id`;
      result = await pool.request().input("Id", id).query(query);
    } else {
      query = `SELECT * FROM [T_Register]`;
      result = await pool.request().query(query);
    }

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User(s) not found" });
    }

    return res.status(200).json({ users: result.recordset });
  } catch (err) {
    console.error("Error fetching users:"+ err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// 🔹 Add New User
async function addUser(req, res) {
  // console.log("Incoming request body:", req.body);
  // debugger;
  const { nome, cognome, email, phone, dataregistrazione, idtipoutente, password, code } = req.body;

  if (!nome || !cognome || !email || !phone || !dataregistrazione || !idtipoutente || !password || !code) {
    return res.status(400).json({ error: "addUser REGISTERED - Missing required fields" });
  }

  try {
    const pool = await getConnection();
    const query = `
      INSERT INTO [T_Register] (Nome, Cognome, Email, Phone, DataRegistrazione, IdTipoUtente, Password, Code)
      VALUES (@Nome, @Cognome, @Email, @Phone, @DataRegistrazione, @IdTipoUtente, @Password, @Code) -- GETDATE()
    `;

    await pool
      .request()
      .input("Nome", nome)
      .input("Cognome", cognome)
      .input("Email", email)
      .input("Phone", phone)
      .input("DataRegistrazione", dataregistrazione)
      .input("IdTipoUtente", idtipoutente)
      .input("Password", password) // Consider hashing the password!
      .input("Code", code)
      .query(query);

    return res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error("Add User Error:"+ err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// 🔹 Update User
async function updateUser(req, res) {
  const { id, nome, cognome, phone } = req.body;

  if (!id || !nome || !cognome || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const pool = await getConnection();
    const query = `
      UPDATE [T_Register]
      SET Nome = @Nome, Cognome = @Cognome, Phone = @Phone
      WHERE Id = @Id
    `;

    await pool
      .request()
      .input("Id", id)
      .input("Nome", nome)
      .input("Cognome", cognome)
      .input("Phone", phone)
      .query(query);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Update Error:"+ err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// 🔹 Delete User
async function deleteUser(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const pool = await getConnection();
    const query = `DELETE FROM [T_Register] WHERE Id = @Id`;

    await pool.request().input("Id", id).query(query);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete Error:"+ err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// 🔹 Check if User is Registered
async function checkUserRegistered(req, res) {
  const { email, code } = req.body; // Read from the request body

  if (!email || !code) {
    return res.status(400).json({ error: "Email and Code are required" });
  }

  try {
    const pool = await getConnection();
    const query = `
      SELECT * FROM [T_Register] WHERE Email = @Email AND Code = @Code
    `;

    const result = await pool
      .request()
      .input("Email", email)
      .input("Code", code)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ registered: false, message: "User not registered or code mismatch" });
    }

    return res.status(200).json({ registered: true, user: result.recordset[0] });
  } catch (err) {
    console.error("Check User Registered Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

