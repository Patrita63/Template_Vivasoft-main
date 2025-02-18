import { executeQuery, closeDatabaseConnection } from "../../../lib/dbsqlazurenew";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Query to fetch T_LearningCenter
            const query = 'SELECT Id AS IdLearningCenter, Nome FROM T_LearningCenter';
            const learningCenters = await executeQuery(query);

            res.status(200).json(learningCenters);
        } catch (error) {
            console.error('Error fetching T_LearningCenter:', error);
            res.status(500).json({ error: 'Failed to fetch T_LearningCenter' });
        } finally {
            // Close the connection pool after the request is complete
            await closeDatabaseConnection();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}