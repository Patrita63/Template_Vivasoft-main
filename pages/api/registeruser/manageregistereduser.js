import getConnection from "../../../lib/dbsqlazure";

// If email and code are provided in the POST request, assume the request is for checking user registration.
// If all parameters required for adding a user are provided, assume the request is for user creation.

// Use precise conditional checks to avoid unintended operation mismatches.
export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getUsers(req, res);
  } else if (req.method === "POST") {
    const { nome, cognome, gender, email, phone, dataregistrazione, idtipoutente, password, code } = req.body;
  
    // Step 3: Validate the email and code combination
    if (email && code && !nome && !cognome && !gender && !phone && !dataregistrazione && !idtipoutente && !password) {
      try {
        const codeCheck = await checkUserRegistered(req, res, true); // Call `checkUserRegistered`
        if (!codeCheck.registered) {
          return res.status(400).json({ message: "Invalid verification code for the provided email" });
        }
        return res.status(200).json({ message: "Verification successful", user: codeCheck.user });
      } catch (err) {
        console.error("Error validating email and code:", err.message);
        return res.status(500).json({ error: "Error validating email and code" });
      }
    }
  
    // Step 1: Check if the user is already registered and add them if not
    try {
      const emailCheck = await checkUserAlreadyRegistered(req, res, true);
      if (emailCheck.isAlreadyRegistered) {
        return res.status(409).json({ message: "User already exists with the provided email", user: emailCheck.user });
      }
    } catch (err) {
      console.error("Error checking email registration:", err.message);
      return res.status(500).json({ error: "Error checking email registration" });
    }
  
    // Step 2: Add the user if they are not already registered
    try {
      if (!nome || !cognome || !gender || !email || !phone || !dataregistrazione || !idtipoutente || !password || !code) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      await addUser(req, res);
      return res.status(201).json({ message: "User successfully added" });
    } catch (err) {
      console.error("Error adding user:", err.message);
      return res.status(500).json({ error: "Error adding user" });
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
      query = `SELECT Reg.Id,Reg.Nome,Reg.Cognome,Reg.Gender,Reg.Email,Reg.Phone,Reg.DataRegistrazione,Reg.Password,Reg.Code,Reg.Note
      ,tipoUt.Id AS IdTipoUtente,tipoUt.TipoUtente,tipoUt.Descrizione AS DescrizioneTipoUtente
	    ,ruoloUt.Id AS IdRuolo,ruoloUt.Ruolo,ruoloUt.Descrizione AS DescrizioneRuolo
      FROM [dbo].[T_Register] AS Reg 
      INNER JOIN [dbo].[T_TipoUtente] AS tipoUt ON Reg.IdTipoUtente = tipoUt.Id
      INNER JOIN [dbo].[T_Ruolo] AS ruoloUt ON Reg.IdRuolo = ruoloUt.Id 
      WHERE Reg.Id = @Id`;
      result = await pool.request().input("Id", id).query(query);
    } else {
      query = `SELECT Reg.Id,Reg.Nome,Reg.Cognome,Reg.Gender,Reg.Email,Reg.Phone,Reg.DataRegistrazione,Reg.Password,Reg.Code,Reg.Note
      ,tipoUt.Id AS IdTipoUtente,tipoUt.TipoUtente,tipoUt.Descrizione AS DescrizioneTipoUtente
	    ,ruoloUt.Id AS IdRuolo,ruoloUt.Ruolo,ruoloUt.Descrizione AS DescrizioneRuolo
      FROM [dbo].[T_Register] AS Reg 
      INNER JOIN [dbo].[T_TipoUtente] AS tipoUt ON Reg.IdTipoUtente = tipoUt.Id
      INNER JOIN [dbo].[T_Ruolo] AS ruoloUt ON Reg.IdRuolo = ruoloUt.Id`;
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
  const { nome, cognome, gender, email, phone, dataregistrazione, idtipoutente, password, code, idruolo } = req.body;

  if (!nome || !cognome || !gender || !email || !phone || !dataregistrazione || !idtipoutente || !password || !code || !idruolo) {
    return res.status(400).json({ error: "addUser REGISTERED - Missing required fields" });
  }

  try {
    const pool = await getConnection();
    const query = `
      INSERT INTO [T_Register] (Nome, Cognome, Gender, Email, Phone, DataRegistrazione, IdTipoUtente, Password, Code, IdRuolo)
      VALUES (@Nome, @Cognome, @Gender, @Email, @Phone, @DataRegistrazione, @IdTipoUtente, @Password, @Code, @IdRuolo) -- GETDATE()
    `;

    await pool
      .request()
      .input("Nome", nome)
      .input("Cognome", cognome)
      .input("Gender", gender)
      .input("Email", email)
      .input("Phone", phone)
      .input("DataRegistrazione", dataregistrazione)
      .input("IdTipoUtente", idtipoutente)
      .input("Password", password) // Consider hashing the password!
      .input("Code", code)
      .input("IdRuolo", idruolo)
      .query(query);

    return res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.error("Add User Error:"+ err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// 🔹 Update User
async function updateUser(req, res) {
  const { id, nome, cognome, gender, phone, email, dataregistrazione, idtipoutente, idruolo, password, code, note } = req.body;

  if (!id || !nome || !cognome || !gender || !phone || !email || !dataregistrazione || !idtipoutente || !idruolo || !password || !code || !note) {
    return res.status(400).json({ error: "updateUser - Missing required fields" });
  }

  try {
    const pool = await getConnection();
    const query = `
      UPDATE [T_Register]
      SET Nome = @Nome, Cognome = @Cognome, Gender = @Gender, Phone = @Phone, Email = @Email, DataRegistrazione = @DataRegistrazione, IdTipoUtente = @IdTipoUtente 
      ,IdRuolo = @IdRuolo, Password = @Password, Code = @Code, Note = @Note
      WHERE Id = @Id
    `;

    await pool
      .request()
      .input("Id", id)
      .input("Nome", nome)
      .input("Cognome", cognome)
      .input("Gender", gender)
      .input("Phone", phone)
      .input("Email", email)
      .input("DataRegistrazione", dataregistrazione)
      .input("IdTipoUtente", idtipoutente)
      .input("IdRuolo", idruolo)
      .input("Password", password)
      .input("Code", code)
      .input("Note", note)
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

// 🔹 Check if User is Already Registered
async function checkUserAlreadyRegistered(req, res, returnResult = false) {
  const { email } = req.body;

  if (!email) {
    const errorResponse = { error: "Email is required" };
    if (returnResult) return { isAlreadyRegistered: false, ...errorResponse };
    return res.status(400).json(errorResponse);
  }

  try {
    const pool = await getConnection();
    const query = `SELECT * FROM [T_Register] WHERE Email = @Email`;

    const result = await pool.request().input("Email", email).query(query);

    const isAlreadyRegistered = result.recordset.length > 0;

    if (returnResult) {
      return { isAlreadyRegistered, user: isAlreadyRegistered ? result.recordset[0] : null };
    }

    if (!isAlreadyRegistered) {
      return res.status(200).json({ isAlreadyRegistered: false, message: "Email not found in the database" });
    }

    return res.status(200).json({
      isAlreadyRegistered: true,
      message: "Email already exists",
      user: result.recordset[0],
    });
  } catch (err) {
    console.error("Check User Already Registered Error:", err);
    if (returnResult) return { isAlreadyRegistered: false, error: err.message };
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



// 🔹 Check verification code of Registered User
async function checkUserRegistered(req, res, returnResult = false) {
  const { email, code } = req.body;

  if (!email || !code) {
    const errorResponse = { error: "Email and Code are required" };
    if (returnResult) return { registered: false, ...errorResponse };
    return res.status(400).json(errorResponse);
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

    const isRegistered = result.recordset.length > 0;

    if (returnResult) {
      return { registered: isRegistered, user: isRegistered ? result.recordset[0] : null };
    }

    if (!isRegistered) {
      return res.status(404).json({
        registered: false,
        message: "User not registered or verification code mismatch",
      });
    }

    return res.status(200).json({ registered: true, user: result.recordset[0] });
  } catch (err) {
    console.error("Check User Registered Error:", err);
    if (returnResult) return { registered: false, error: err.message };
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



