import { executeQuery, closeDatabaseConnection } from "../../../lib/dbsqlazurenew";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Query to fetch T_TipoErogazione
            const query = 'SELECT Id AS IdTipoErogazione, Nome FROM T_TipoErogazione';
            const deliveryTypes = await executeQuery(query);
            
            res.status(200).json(deliveryTypes);
        } catch (error) {
            console.error('Error fetching T_TipoErogazione:', error);
            res.status(500).json({ error: 'Failed to fetch T_TipoErogazione' });
        } finally {
            await closeDatabaseConnection();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}