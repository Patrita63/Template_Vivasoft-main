import getConnection from "../../../lib/dbsqlazure";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('Id', sql.Int, id)
                .query(`
                    SELECT 
                        Agenda.*, 
                        CatCor.Nome AS CatalogoNome, 
                        LCenter.Nome AS LearningCenterNome, 
                        StaAgenda.Nome AS StatoNome, 
                        TipoErog.Nome AS TipoErogNome 
                    FROM dbo.T_AgendaCorsi AS Agenda
                    INNER JOIN dbo.T_CatalogoCorsi AS CatCor ON Agenda.IdCatalogoCorsi = CatCor.Id
                    INNER JOIN dbo.T_LearningCenter AS LCenter ON Agenda.IdLearningCenter = LCenter.Id
                    INNER JOIN dbo.T_StatoAgenda AS StaAgenda ON Agenda.IdStatoAgenda = StaAgenda.Id
                    INNER JOIN dbo.T_TipoErogazione AS TipoErog ON Agenda.IdTipoErogazione = TipoErog.Id
                    WHERE Agenda.Id = @Id
                `);
            if (!result.recordset.length) {
                return res.status(404).json({ error: 'Not Found' });
            }
            res.status(200).json(result.recordset[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const { IdCatalogoCorsi, IdLearningCenter, IdStatoAgenda, IdTipoErogazione } = req.body;
            const pool = await getConnection();
            await pool.request()
                .input('Id', sql.Int, id)
                .input('IdCatalogoCorsi', sql.Int, IdCatalogoCorsi)
                .input('IdLearningCenter', sql.Int, IdLearningCenter)
                .input('IdStatoAgenda', sql.Int, IdStatoAgenda)
                .input('IdTipoErogazione', sql.Int, IdTipoErogazione)
                .query(`
                    UPDATE dbo.T_AgendaCorsi 
                    SET IdCatalogoCorsi = @IdCatalogoCorsi, 
                        IdLearningCenter = @IdLearningCenter, 
                        IdStatoAgenda = @IdStatoAgenda, 
                        IdTipoErogazione = @IdTipoErogazione 
                    WHERE Id = @Id
                `);
            res.status(200).json({ message: 'Record updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'DELETE') {
        try {
            const pool = await getConnection();
            await pool.request()
                .input('Id', sql.Int, id)
                .query('DELETE FROM dbo.T_AgendaCorsi WHERE Id = @Id');
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
