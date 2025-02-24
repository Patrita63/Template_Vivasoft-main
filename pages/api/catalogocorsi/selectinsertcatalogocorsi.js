import { getConnection, closeDatabaseConnection } from "../../../lib/dbsqlazure";
import sql from 'mssql';

export default async function handler(req, res) {
    let pool;
    if (req.method === 'GET') {
        try {
            pool = await getConnection(); // Establish a database connection

            const query = `
                SELECT 
                CatCor.Id, CatCor.Nome AS NomeCorso, CatCor.Descrizione AS DescrizioneCorso, 
                CatCor.Link, CatCor.Durata,
                Tec.Nome AS NomeTecnologia, Tec.Descrizione AS DescrizioneTecnologia,
                Prov.Nome AS NomeProvider
                FROM dbo.T_CatalogoCorsi AS CatCor
                INNER JOIN dbo.T_Tecnologia AS Tec ON CatCor.IdTecnologia = Tec.Id
                INNER JOIN dbo.T_Provider AS Prov ON Tec.IdProvider = Prov.Id
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
        // Create new course
        const { Nome, Descrizione, Link, Durata, IdTecnologia } = req.body;
        try {
            pool = await getConnection(); // Establish a database connection

            const query = `
                INSERT INTO dbo.T_CatalogoCorsi (Nome, Descrizione, Link, Durata, IdTecnologia) 
                    VALUES (@Nome, @Descrizione, @Link, @Durata, @IdTecnologia)
            `;

            const result = await pool
            .request()
            .input('Nome', sql.NVarChar, Nome)
                .input('Descrizione', sql.NVarChar, Descrizione)
                .input('Link', sql.NVarChar, Link)
                .input('Durata', sql.Int, Durata)
                .input('IdTecnologia', sql.Int, IdTecnologia)
            .query(query);

            res.status(201).json({ message: 'Course added successfully' });
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
