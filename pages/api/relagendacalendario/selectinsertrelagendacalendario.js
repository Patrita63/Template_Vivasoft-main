import { getConnection, closeDatabaseConnection } from "../../../lib/dbsqlazure";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let pool;
        try {
            pool = await getConnection(); // Establish a database connection

            const query = `
            SELECT
                RelAgenCorsiCal.Id
                ,Calend.Id AS IdCalendario
                ,Agenda.Id AS IdAgenda
                ,StatAgenda.Id AS IdStatoAgenda
                ,LCenter.Id AS IdLearningCenter
                ,Aula.Id AS IdAula
                ,Ut.Id AS IdUtente, Ut.Email
                ,TipoUt.Id AS IdTipoUtente, TipoUt.TipoUtente
                FROM [dbo].[T_RelAgendaCorsiCalendario] AS RelAgenCorsiCal
                INNER JOIN [dbo].[T_Calendario] AS Calend ON RelAgenCorsiCal.IdCalendario = Calend.Id
                INNER JOIN [dbo].[T_AgendaCorsi] AS Agenda ON RelAgenCorsiCal.IdAgendaCorsi = Agenda.Id
                INNER JOIN [dbo].[T_StatoAgenda] AS StatAgenda ON Agenda.IdStatoAgenda = StatAgenda.Id
                INNER JOIN [dbo].[T_LearningCenter] LCenter ON RelAgenCorsiCal.IdLearningCenter = LCenter.Id
                INNER JOIN [dbo].[T_Aula] AS Aula ON RelAgenCorsiCal.IdAula = Aula.Id
                INNER JOIN [dbo].[T_Utente] AS Ut ON RelAgenCorsiCal.IdUtente = Ut.Id
                INNER JOIN [dbo].[T_TipoUtente] AS TipoUt ON Ut.IdTipoUtente = TipoUt.Id
        `;

            const result = await pool.request().query(query);
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (pool) {
                await closeDatabaseConnection();
            }
        }
    } else if (req.method === 'POST') {
        try {
            const { IdCalendario, IdAgendaCorsi, IdLearningCenter, IdAula, IdUtente } = req.body;

            pool = await getConnection(); // Establish a database connection

            const query = `
            INSERT INTO [dbo].[T_RelAgendaCorsiCalendario] 
                (IdCalendario, IdAgendaCorsi, IdLearningCenter, IdAula, IdUtente) 
                VALUES (@IdCalendario, @IdAgendaCorsi, @IdLearningCenter, @IdAula, @IdUtente)
        `;

            await pool.request()
                .input('IdCalendario', sql.Int, IdCalendario)
                .input('IdAgendaCorsi', sql.Int, IdAgendaCorsi)
                .input('IdLearningCenter', sql.Int, IdLearningCenter)
                .input('IdAula', sql.Int, IdAula)
                .input('IdUtente', sql.Int, IdUtente)
                .query(query);

            res.status(201).json({ message: 'Record added successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Database error', error: error.message });
        } finally {
            if (pool) {
                await closeDatabaseConnection();
            }
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
