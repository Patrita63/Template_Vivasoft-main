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
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const pool = await getConnection();

        const query = `
            SELECT DISTINCT
                c.Id AS Day_Id,
                c.Data AS Day_Date,
                c.Giorno AS Day_DayNumber,
                c.NomeGiorno AS Day_Name,
                c.NumeroGiornoSettimana AS Day_WeekdayNumber,
                c.Mese AS Day_MonthNumber,
                c.NomeMese AS Day_MonthName,
                c.Anno AS Day_Year,
                c.NumeroSettimanaAnno AS Day_WeekNumber,

                -- Weekly Calendar Days IDs (Fetched dynamically from T_Calendario)
                sun.Id AS Sunday_Id,
                mon.Id AS Monday_Id,
                tue.Id AS Tuesday_Id,
                wed.Id AS Wednesday_Id,
                thu.Id AS Thursday_Id,
                fri.Id AS Friday_Id,
                sat.Id AS Saturday_Id,

                -- Event Details (May be NULL if no event on this day)
                relagendacorsical.IdCalendario,
                relagendacorsical.IdAgendaCorsi,
                agencorsi.NumeroDiscenti,
                agencorsi.IsMTM,
                agencorsi.IsFinanziato,
                agencorsi.IsAcademy,
                agencorsi.ClienteFinale,
                agencorsi.TotaleOre,
                tipoerogaz.Nome AS TipoErogazione,
                statagen.Nome AS StatoAgenda,
                learncen.Nome AS LearningCenter,
                relagendacorsical.IdLearningCenter,
                learncen.Indirizzo AS IndirizzoLearningCenter,
                relagendacorsical.IdAula,
                aula.Nome AS NomeAula

            FROM dbo.T_Calendario c

            -- Join T_Calendario to get day IDs dynamically for the same week
            LEFT JOIN dbo.T_Calendario sun ON sun.Anno = c.Anno AND sun.NumeroSettimanaAnno = c.NumeroSettimanaAnno AND sun.NumeroGiornoSettimana = 1
            LEFT JOIN dbo.T_Calendario mon ON mon.Anno = c.Anno AND mon.NumeroSettimanaAnno = c.NumeroSettimanaAnno AND mon.NumeroGiornoSettimana = 2
            LEFT JOIN dbo.T_Calendario tue ON tue.Anno = c.Anno AND tue.NumeroSettimanaAnno = c.NumeroSettimanaAnno AND tue.NumeroGiornoSettimana = 3
            LEFT JOIN dbo.T_Calendario wed ON wed.Anno = c.Anno AND wed.NumeroSettimanaAnno = c.NumeroSettimanaAnno AND wed.NumeroGiornoSettimana = 4
            LEFT JOIN dbo.T_Calendario thu ON thu.Anno = c.Anno AND thu.NumeroSettimanaAnno = c.NumeroSettimanaAnno AND thu.NumeroGiornoSettimana = 5
            LEFT JOIN dbo.T_Calendario fri ON fri.Anno = c.Anno AND fri.NumeroSettimanaAnno = c.NumeroSettimanaAnno AND fri.NumeroGiornoSettimana = 6
            LEFT JOIN dbo.T_Calendario sat ON sat.Anno = c.Anno AND sat.NumeroSettimanaAnno = c.NumeroSettimanaAnno AND sat.NumeroGiornoSettimana = 7

            -- Join Event Tables (LEFT JOIN ensures we still get all days even if no event exists)
            LEFT JOIN dbo.T_RelAgendaCorsiCalendario relagendacorsical 
                ON relagendacorsical.IdCalendario = c.Id
            LEFT JOIN dbo.T_AgendaCorsi agencorsi 
                ON agencorsi.Id = relagendacorsical.IdAgendaCorsi
            LEFT JOIN dbo.T_TipoErogazione tipoerogaz 
                ON tipoerogaz.Id = agencorsi.IdTipoErogazione
            LEFT JOIN dbo.T_StatoAgenda statagen 
                ON statagen.Id = agencorsi.IdStatoAgenda
            LEFT JOIN dbo.T_LearningCenter learncen 
                ON learncen.Id = relagendacorsical.IdLearningCenter
            LEFT JOIN dbo.T_Aula aula 
                ON aula.Id = relagendacorsical.IdAula

            ORDER BY c.Anno, c.NomeMese, c.NumeroSettimanaAnno, c.Data;
        `;

        console.log('getAllCalendarioMensile - query', query);

        // const query = `
        //     WITH WeeklyCalendar AS (
        //     -- Weekly Calendar Pivot Query
        //     SELECT 
        //         Anno,
        //         NomeMese,
        //         NumeroSettimanaAnno,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 1 THEN Id ELSE NULL END) AS Sunday_Id,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 2 THEN Id ELSE NULL END) AS Monday_Id,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 3 THEN Id ELSE NULL END) AS Tuesday_Id,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 4 THEN Id ELSE NULL END) AS Wednesday_Id,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 5 THEN Id ELSE NULL END) AS Thursday_Id,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 6 THEN Id ELSE NULL END) AS Friday_Id,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 7 THEN Id ELSE NULL END) AS Saturday_Id,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 1 THEN Giorno ELSE NULL END) AS Sunday,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 2 THEN Giorno ELSE NULL END) AS Monday,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 3 THEN Giorno ELSE NULL END) AS Tuesday,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 4 THEN Giorno ELSE NULL END) AS Wednesday,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 5 THEN Giorno ELSE NULL END) AS Thursday,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 6 THEN Giorno ELSE NULL END) AS Friday,
        //         MAX(CASE WHEN NumeroGiornoSettimana = 7 THEN Giorno ELSE NULL END) AS Saturday
        //     FROM dbo.T_Calendario
        //     GROUP BY 
        //         Anno, NomeMese, NumeroSettimanaAnno
        // )
        // SELECT 
        //     wc.Anno,
        //     wc.NomeMese,
        //     wc.NumeroSettimanaAnno,

        //     -- Weekly Calendar Days
        //     wc.Sunday_Id, wc.Monday_Id, wc.Tuesday_Id, wc.Wednesday_Id, wc.Thursday_Id, wc.Friday_Id, wc.Saturday_Id,

        //     -- Event Details
        //     relagendacorsical.[Id] AS IdRelAgendaCorsiCalendario,
        //     relagendacorsical.[IdCalendario],
        //     relagendacorsical.[IdAgendaCorsi],
        //     agencorsi.[NumeroDiscenti],
        //     agencorsi.[IsMTM],
        //     agencorsi.[IsFinanziato],
        //     agencorsi.[IsAcademy],
        //     agencorsi.[ClienteFinale],
        //     agencorsi.[TotaleOre],
        //     tipoerogaz.Nome AS TipoErogazione,
        //     statagen.Nome AS StatoAgenda,
        //     learncen.Nome AS LearningCenter,
        //     relagendacorsical.[IdLearningCenter],
        //     learncen.Indirizzo AS IndirizzoLearningCenter,
        //     relagendacorsical.[IdAula],
        //     aula.Nome AS NomeAula,
        //     relagendacorsical.[IdUtente],
        //     ut.Nome + ' ' + ut.Cognome AS Nominativo,
        //     ut.Email,
        //     ut.Phone,
        //     tipout.TipoUtente
        // FROM WeeklyCalendar wc
        // LEFT JOIN dbo.T_RelAgendaCorsiCalendario relagendacorsical 
        //     ON relagendacorsical.IdCalendario IN (wc.Sunday_Id, wc.Monday_Id, wc.Tuesday_Id, 
        //                                         wc.Wednesday_Id, wc.Thursday_Id, wc.Friday_Id, wc.Saturday_Id)
        // LEFT JOIN dbo.T_AgendaCorsi agencorsi 
        //     ON agencorsi.Id = relagendacorsical.IdAgendaCorsi
        // LEFT JOIN dbo.T_TipoErogazione tipoerogaz 
        //     ON tipoerogaz.Id = agencorsi.IdTipoErogazione
        // LEFT JOIN dbo.T_StatoAgenda statagen 
        //     ON statagen.Id = agencorsi.IdStatoAgenda
        // LEFT JOIN dbo.T_LearningCenter learncen 
        //     ON learncen.Id = relagendacorsical.[IdLearningCenter]
        // LEFT JOIN dbo.T_Aula aula 
        //     ON aula.Id = relagendacorsical.[IdAula]
        // LEFT JOIN dbo.T_Utente ut 
        //     ON ut.Id = relagendacorsical.[IdUtente]
        // LEFT JOIN dbo.T_TipoUtente tipout 
        //     ON tipout.Id = ut.IdTipoUtente
        // ORDER BY wc.Anno, wc.NomeMese, wc.NumeroSettimanaAnno;
        // `;

        const result = await pool
            .request()
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Data not found" });
        }

        return res.status(200).json({ user: result.recordset });

    } catch (err) {
        console.error("getAllCalendarioMensile Error:" + err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

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
