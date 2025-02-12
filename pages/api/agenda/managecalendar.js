import sql from "mssql";

import getConnection from "../../../lib/dbsqlazure";

// Use precise conditional checks to avoid unintended operation mismatches.
export default async function handler(req, res) {
    if (req.method === "GET") {
        return await getAllCalendarioMensile(req, res);
    } else if (req.method === "POST") {
        const { year, monthname } = req.body; 
        if (year && monthname) {
            try {
                console.log('call getCalendarioMensile; ', year, monthname);
                return await getCalendarioMensile(req, res); // Call `getCalendarioMensile`

            } catch (err) {
                console.error("Error calling getCalendarioMensile:", err.message);
                return res.status(500).json({ error: "Error calling getCalendarioMensile" });
            }
        }
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

}

// getAllCalendarioMensile.sql
// 🔹 Fetch All Data Agenda
async function getAllCalendarioMensile(req, res) {
    if (req.method === 'GET') {
        res.status(500).json({ error: "NOT IMPLEMENTED" });
    }
};



// GetCalendarioByYearAndMonth.sql
// 🔹 Fetch Data Agenda by year and month
async function getCalendarioMensile(req, res) {
    console.log("🟢 Received request body:", req.body);
    const { year, monthname } = req.body;

    if (!year || !monthname) {
        return res.status(400).json({ error: "Missing required fields: year or monthname" });
    }

    try {
        const pool = await getConnection();

        console.log("🟢 Calling stored procedure with params:", { year, monthname });

        const result = await pool.request()
            .input("Anno", sql.Int, year)
            .input("NomeMese", sql.VarChar, monthname)
            .execute("usp_GetCalendarioMensile"); // ✅ Calling stored procedure

        console.log("🟢 Query Result:", result.recordset);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }

        return res.status(200).json({ datacalendar: result.recordset });

    } catch (err) {
        console.error("❌ Error fetching getCalendarioMensile:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
}
