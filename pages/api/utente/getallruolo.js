import getConnection from '../../../lib/dbsqlazure';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const pool = await getConnection();
        const query = `
            SELECT Id, Ruolo, Descrizione FROM T_Ruolo
        `;

        const result = await pool
            .request()
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Data not found" });
        }

        return res.status(200).json({ user: result.recordset });

    } catch (err) {
        console.error("GetAllRuolo Error:"+ err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
