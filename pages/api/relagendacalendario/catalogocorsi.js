import { executeQuery, closeDatabaseConnection } from "../../../lib/dbsqlazurenew";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Query to fetch T_CatalogoCorsi
            const query = 'SELECT Id AS IdCatalogoCorsi, Nome FROM T_CatalogoCorsi';
            const courses = await executeQuery(query);

            res.status(200).json(courses);
        } catch (error) {
            console.error('Error fetching T_CatalogoCorsi:', error);
            res.status(500).json({ error: 'Failed to fetch T_CatalogoCorsi' });
        } finally {
            // Close the connection pool after the request is complete
            await closeDatabaseConnection();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}