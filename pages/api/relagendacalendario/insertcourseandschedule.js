import { executeStoredProcedure, closeDatabaseConnection } from "../../../lib/dbsqlazurenew";
import sql from 'mssql';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Destructure the request body
            const {
                DataInizio,
                DataFine,
                IdCatalogoCorsi,
                IdLearningCenter,
                ClienteFinale,
                Descrizione,
                NumeroDiscenti,
                IdTipoErogazione,
                TotaleOre,
                IsMTM,
                IsFinanziato,
                IsAcademy,
                IdStatoAgenda,
                Note,
                MailUtente,
            } = req.body;

            // Define the stored procedure name
            const storedProcedure = 'usp_insCourseAndSchedule';

            // Define the parameters for the stored procedure
            const params = [
                { name: 'DataInizio', type: sql.DateTime, value: DataInizio },
                { name: 'DataFine', type: sql.DateTime, value: DataFine },
                { name: 'IdCatalogoCorsi', type: sql.Int, value: IdCatalogoCorsi },
                { name: 'IdLearningCenter', type: sql.Int, value: IdLearningCenter },
                { name: 'ClienteFinale', type: sql.NVarChar(100), value: ClienteFinale || null },
                { name: 'Descrizione', type: sql.NVarChar(2000), value: Descrizione || null },
                { name: 'NumeroDiscenti', type: sql.SmallInt, value: NumeroDiscenti || null },
                { name: 'IdTipoErogazione', type: sql.Int, value: IdTipoErogazione || null },
                { name: 'TotaleOre', type: sql.SmallInt, value: TotaleOre || null },
                { name: 'IsMTM', type: sql.Bit, value: IsMTM || 0 },
                { name: 'IsFinanziato', type: sql.Bit, value: IsFinanziato || 0 },
                { name: 'IsAcademy', type: sql.Bit, value: IsAcademy || 0 },
                { name: 'IdStatoAgenda', type: sql.Int, value: IdStatoAgenda || null },
                { name: 'Note', type: sql.NVarChar(4000), value: Note || null },
                { name: 'MailUtente', type: sql.NVarChar(250), value: MailUtente },
            ];

            // Execute the stored procedure using executeQuery
            const result = await executeStoredProcedure(storedProcedure, params);

            // Return the result
            res.status(200).json({ success: true, result });
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).json({ success: false, error: error.message });
        } finally {
            // Close the connection pool
            await closeDatabaseConnection();
        }
    } else {
        // Return 405 Method Not Allowed if the request method is not POST
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}