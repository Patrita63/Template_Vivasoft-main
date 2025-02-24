import { getConnection, closeDatabaseConnection } from "../../../lib/dbsqlazurenew";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let pool;
        try {
            pool = await getConnection(); // Establish a database connection

            const query = `
                SELECT 
                    Agenda.Id, Agenda.DataInizio, Agenda.DataFine
                    ,CatCor.Nome AS NomeCorso, CatCor.Durata
                    ,LCenter.Id AS IdLearningCenter, LCenter.Nome AS LearningCenter
                    ,StaAgenda.Nome AS StatoAgenda
                    ,TipoErog.Nome AS TipoErogazione
                FROM dbo.T_AgendaCorsi AS Agenda
                INNER JOIN dbo.T_CatalogoCorsi AS CatCor ON Agenda.IdCatalogoCorsi = CatCor.Id
                INNER JOIN dbo.T_LearningCenter AS LCenter ON Agenda.IdLearningCenter = LCenter.Id
                INNER JOIN dbo.T_StatoAgenda AS StaAgenda ON Agenda.IdStatoAgenda = StaAgenda.Id
                INNER JOIN dbo.T_TipoErogazione AS TipoErog ON Agenda.IdTipoErogazione = TipoErog.Id
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
            const { IdCatalogoCorsi, IdLearningCenter, IdStatoAgenda, IdTipoErogazione } = req.body;
            const pool = await poolPromise;
            await pool.request()
                .input('IdCatalogoCorsi', sql.Int, IdCatalogoCorsi)
                .input('IdLearningCenter', sql.Int, IdLearningCenter)
                .input('IdStatoAgenda', sql.Int, IdStatoAgenda)
                .input('IdTipoErogazione', sql.Int, IdTipoErogazione)
                .query(`
                    INSERT INTO dbo.T_AgendaCorsi (IdCatalogoCorsi, IdLearningCenter, IdStatoAgenda, IdTipoErogazione) 
                    VALUES (@IdCatalogoCorsi, @IdLearningCenter, @IdStatoAgenda, @IdTipoErogazione)
                `);
            res.status(201).json({ message: 'Record created successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (pool) {
                await closeDatabaseConnection();
            }
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
