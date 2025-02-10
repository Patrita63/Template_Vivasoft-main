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
                    CatCor.Id, CatCor.Nome AS NomeCorso, CatCor.Descrizione AS DescrizioneCorso, 
                    CatCor.Link, CatCor.Durata,
                    Tec.Nome AS NomeTecnologia, Tec.Descrizione AS DescrizioneTecnologia,
                    Prov.Nome AS NomeProvider
                    FROM dbo.T_CatalogoCorsi AS CatCor
                    INNER JOIN dbo.T_Tecnologia AS Tec ON CatCor.IdTecnologia = Tec.Id
                    INNER JOIN dbo.T_Provider AS Prov ON Tec.IdProvider = Prov.Id
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
        // Update course
        const { Id, Nome, Descrizione, Link, Durata, IdTecnologia } = req.body;
        try {
            await db.request()
                .input('Id', sql.Int, Id)
                .input('Nome', sql.NVarChar, Nome)
                .input('Descrizione', sql.NVarChar, Descrizione)
                .input('Link', sql.NVarChar, Link)
                .input('Durata', sql.Int, Durata)
                .input('IdTecnologia', sql.Int, IdTecnologia)
                .query(`
          UPDATE dbo.T_CatalogoCorsi 
          SET Nome = @Nome, Descrizione = @Descrizione, Link = @Link, Durata = @Durata, IdTecnologia = @IdTecnologia 
          WHERE Id = @Id
        `);
            res.status(200).json({ message: 'Course updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'DELETE') {
        // Delete course
        const { Id } = req.body;
        try {
            await db.request()
                .input('Id', sql.Int, Id)
                .query(`DELETE FROM dbo.T_CatalogoCorsi WHERE Id = @Id`);
            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
