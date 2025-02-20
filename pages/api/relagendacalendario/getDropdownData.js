import { executeQuery, closeDatabaseConnection } from "../../../lib/dbsqlazurenew";

export default async function handler(req, res) {
    debugger;
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Execute all queries using a single connection
        // http://localhost:3000/api/relagendacalendario/getDropdownData
        const [courses, learningCenters, deliveryTypes, statuses] = await Promise.all([
            executeQuery("SELECT Id AS IdCatalogoCorsi, Nome FROM T_CatalogoCorsi"),
            executeQuery("SELECT Id AS IdLearningCenter, Nome FROM T_LearningCenter"),
            executeQuery("SELECT Id AS IdTipoErogazione, Nome FROM T_TipoErogazione"),
            executeQuery("SELECT Id AS IdStatoAgenda, Nome FROM T_StatoAgenda"),
        ]);

        // Return all dropdown data in a single response
        res.status(200).json({
            catalogocorsiOptions: courses,
            learningCenterOptions: learningCenters,
            deliveryTypeOptions: deliveryTypes,
            statusOptions: statuses
        });
    } catch (error) {
        console.error("Error fetching dropdown data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    finally {
        // Close the connection pool after the request is complete
        await closeDatabaseConnection();
    }
}
