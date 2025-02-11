import getConnection from "../../../lib/dbsqlazure";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const pool = await getConnection();
            
            // Get lookup tables for dropdowns
            const lookups = await Promise.all([
                pool.request().query('SELECT * FROM dbo.T_CatalogoCorsi'),
                pool.request().query('SELECT * FROM dbo.T_LearningCenter'),
                pool.request().query('SELECT * FROM dbo.T_StatoAgenda'),
                pool.request().query('SELECT * FROM dbo.T_TipoErogazione'),
            ]);
            return res.status(200).json({
                lookups: {
                    catalogo: lookups[0].recordset,
                    learningCenter: lookups[1].recordset,
                    statoAgenda: lookups[2].recordset,
                    tipoErogazione: lookups[3].recordset,
                }
            });
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }  else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
