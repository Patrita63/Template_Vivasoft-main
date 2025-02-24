import { getConnection, closeDatabaseConnection } from "../../../lib/dbsqlazure";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        let pool;
        try {
            pool = await getConnection(); // Establish a database connection

            const query = `
            SELECT 
                RelAgenCorsiCal.*, Calend.*, Agenda.*, 
                StatAgenda.*, LCenter.*, Aula.*, Ut.*, TipoUt.*
                FROM [dbo].[T_RelAgendaCorsiCalendario] AS RelAgenCorsiCal
                INNER JOIN [dbo].[T_Calendario] AS Calend ON RelAgenCorsiCal.IdCalendario = Calend.Id
                INNER JOIN [dbo].[T_AgendaCorsi] AS Agenda ON RelAgenCorsiCal.IdAgendaCorsi = Agenda.Id
                INNER JOIN [dbo].[T_StatoAgenda] AS StatAgenda ON Agenda.IdStatoAgenda = StatAgenda.Id
                INNER JOIN [dbo].[T_LearningCenter] LCenter ON RelAgenCorsiCal.IdLearningCenter = LCenter.Id
                INNER JOIN [dbo].[T_Aula] AS Aula ON RelAgenCorsiCal.IdAula = Aula.Id
                INNER JOIN [dbo].[T_Utente] AS Ut ON RelAgenCorsiCal.IdUtente = Ut.Id
                INNER JOIN [dbo].[T_TipoUtente] AS TipoUt ON Ut.IdTipoUtente = TipoUt.Id
            WHERE RelAgenCorsiCal.Id = @Id
        `;

            const result = await pool.request()
                .input('Id', sql.Int, id)
                .query(query);
            if (!result.recordset.length) {
                return res.status(404).json({ error: 'Not Found' });
            }
            res.status(200).json(result.recordset[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (pool) {
                await closeDatabaseConnection();
            }
        }
    } else if (req.method === 'PUT') {
        // Update course
        const { Id, Nome, Descrizione, Link, Durata, IdTecnologia } = req.body;

        let pool;
        try {
            pool = await getConnection(); // Establish a database connection
            const query = `
            UPDATE dbo.T_CatalogoCorsi 
                SET Nome = @Nome, Descrizione = @Descrizione, Link = @Link, Durata = @Durata, IdTecnologia = @IdTecnologia 
            WHERE Id = @Id
        `;
            await pool.request()
                .input('Id', sql.Int, Id)
                .input('Nome', sql.NVarChar, Nome)
                .input('Descrizione', sql.NVarChar, Descrizione)
                .input('Link', sql.NVarChar, Link)
                .input('Durata', sql.Int, Durata)
                .input('IdTecnologia', sql.Int, IdTecnologia)
                .query(query);
            res.status(200).json({ message: 'Course updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (pool) {
                await closeDatabaseConnection();
            }
        }
    } else if (req.method === 'DELETE') {
        let pool;
        try {
            const { id } = req.query;

            pool = await getConnection(); // Establish a database connection
            const query = `
            DELETE FROM [dbo].[T_RelAgendaCorsiCalendario] WHERE Id = @Id
        `;

            await pool.request().input('Id', sql.Int, id).query(query);

            res.status(200).json({ message: 'Record deleted successfully' });
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
