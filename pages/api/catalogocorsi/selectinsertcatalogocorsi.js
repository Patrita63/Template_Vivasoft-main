import getConnection from "../../../lib/dbsqlazure";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const pool = await getConnection();
            const result = await pool.request().query(`
                SELECT 
                CatCor.Id, CatCor.Nome AS NomeCorso, CatCor.Descrizione AS DescrizioneCorso, 
                CatCor.Link, CatCor.Durata,
                Tec.Nome AS NomeTecnologia, Tec.Descrizione AS DescrizioneTecnologia,
                Prov.Nome AS NomeProvider
                FROM dbo.T_CatalogoCorsi AS CatCor
                INNER JOIN dbo.T_Tecnologia AS Tec ON CatCor.IdTecnologia = Tec.Id
                INNER JOIN dbo.T_Provider AS Prov ON Tec.IdProvider = Prov.Id
            `);
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        // Create new course
        const { Nome, Descrizione, Link, Durata, IdTecnologia } = req.body;
        try {
            await db.request()
                .input('Nome', sql.NVarChar, Nome)
                .input('Descrizione', sql.NVarChar, Descrizione)
                .input('Link', sql.NVarChar, Link)
                .input('Durata', sql.Int, Durata)
                .input('IdTecnologia', sql.Int, IdTecnologia)
                .query(`
          INSERT INTO dbo.T_CatalogoCorsi (Nome, Descrizione, Link, Durata, IdTecnologia) 
          VALUES (@Nome, @Descrizione, @Link, @Durata, @IdTecnologia)
        `);
            res.status(201).json({ message: 'Course added successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
