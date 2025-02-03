import getConnection from "../../../lib/dbsqlazure";

// Use precise conditional checks to avoid unintended operation mismatches.
export default async function handler(req, res) {
    if (req.method === "GET") {
        return await getAllCalendarioMensile(req, res);
    } else if (req.method === "POST") {
        const { year, month } = req.body;
        if (year && month) {
            try {
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
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const pool = await getConnection();
        const query = `
            SELECT 
                NumeroSettimanaAnno,
                MAX(CASE WHEN NumeroGiornoSettimana = 1 THEN Giorno ELSE NULL END) AS Sunday,
                MAX(CASE WHEN NumeroGiornoSettimana = 2 THEN Giorno ELSE NULL END) AS Monday,
                MAX(CASE WHEN NumeroGiornoSettimana = 3 THEN Giorno ELSE NULL END) AS Tuesday,
                MAX(CASE WHEN NumeroGiornoSettimana = 4 THEN Giorno ELSE NULL END) AS Wednesday,
                MAX(CASE WHEN NumeroGiornoSettimana = 5 THEN Giorno ELSE NULL END) AS Thursday,
                MAX(CASE WHEN NumeroGiornoSettimana = 6 THEN Giorno ELSE NULL END) AS Friday,
                MAX(CASE WHEN NumeroGiornoSettimana = 7 THEN Giorno ELSE NULL END) AS Saturday
            FROM (
                SELECT 
                    Id,
                    Data,
                    NomeGiorno,
                    NumeroGiornoSettimana,
                    NumeroSettimanaAnno,
                    NomeMese,
                    Anno,
                    Giorno
                FROM 
                    T_Calendario
            ) AS WeeklyData
            GROUP BY 
                NumeroSettimanaAnno, NomeMese, Anno
            ORDER BY 
                NumeroSettimanaAnno;
        `;

        const result = await pool
            .request()
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Data not found" });
        }

        return res.status(200).json({ user: result.recordset });

    } catch (err) {
        console.error("getAllCalendarioMensile Error:"+ err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// GetCalendarioByYearAndMonth.sql
// 🔹 Fetch Data Agenda by year and month
async function getCalendarioMensile(req, res) {

    const { year, month } = req.body;

    if (!year || !month ) {
        return res.status(400).json({ error: "getCalendarioMensile - Missing required fields" });
    }
  
    try {
      const pool = await getConnection();
      let result;

      const query = `
            SELECT 
                NumeroSettimanaAnno,
                MAX(CASE WHEN NumeroGiornoSettimana = 1 THEN Giorno ELSE NULL END) AS Sunday,
                MAX(CASE WHEN NumeroGiornoSettimana = 2 THEN Giorno ELSE NULL END) AS Monday,
                MAX(CASE WHEN NumeroGiornoSettimana = 3 THEN Giorno ELSE NULL END) AS Tuesday,
                MAX(CASE WHEN NumeroGiornoSettimana = 4 THEN Giorno ELSE NULL END) AS Wednesday,
                MAX(CASE WHEN NumeroGiornoSettimana = 5 THEN Giorno ELSE NULL END) AS Thursday,
                MAX(CASE WHEN NumeroGiornoSettimana = 6 THEN Giorno ELSE NULL END) AS Friday,
                MAX(CASE WHEN NumeroGiornoSettimana = 7 THEN Giorno ELSE NULL END) AS Saturday
            FROM (
                SELECT 
                    Id,
                    Data,
                    NomeGiorno,
                    NumeroGiornoSettimana,
                    NumeroSettimanaAnno,
                    NomeMese,
                    Anno,
                    Giorno
                FROM 
                    T_Calendario
                WHERE 
                    Anno = ` + year + ` AND Mese = ` + month + `
            ) AS WeeklyData
            GROUP BY 
                NumeroSettimanaAnno, NomeMese, Anno
            ORDER BY 
                NumeroSettimanaAnno;
        `;
        // debugger;
        console.log('getCalendarioMensile - query' + query);

        result = await pool.request()
        .input("Anno", year)
        .input("Mese", month)
        .query(query);
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Record(s) getCalendarioMensile not found" });
      }
  
      return res.status(200).json({ datacalendar: result.recordset });
    } catch (err) {
      console.error("Error fetching getCalendarioMensile:"+ err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }