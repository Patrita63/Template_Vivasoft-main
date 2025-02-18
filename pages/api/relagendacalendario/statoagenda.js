import { executeQuery, closeDatabaseConnection } from "../../../lib/dbsqlazurenew";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Query to fetch T_StatoAgenda
            const query = 'SELECT Id AS IdStatoAgenda, Nome FROM T_StatoAgenda';
            const statoAgendas = await executeQuery(query);
            
            res.status(200).json(statoAgendas);

        } catch (error) {
            console.error('Error fetching T_StatoAgenda:', error);
            res.status(500).json({ error: 'Failed to fetch T_StatoAgenda' });
        } finally {
            await closeDatabaseConnection();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}