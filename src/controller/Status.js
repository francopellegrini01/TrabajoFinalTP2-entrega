import { sequelize } from "../databases/mysql.cnx.js";

const AppStatus = {

    welcome:
        async (req, res) => {
            res.json({
                service: "RRHH - Gestión de Empleados",
                version: "1.0.0",
                status: "operational",
                description: "API para la gestión de empleados, usuarios y estadísticas internas.",
                capabilities: {
                    database: "MySQL (Aiven) + Supabase Auth",
                    auth: "JWT con roles (admin / rrhh)",
                    features: "CRUD, estadisticas, API externa"
                },
                links: {
                    health: `${req.protocol}://${req.get('host')}/healthCheck`,
                    repository: "https://github.com/francopellegrini01/TrabajoFinalTP2-entrega", 
                },
                timestamp: new Date().toISOString()
            });
        },

    healtCheck:
        async (req, res) => {

            // Validamos conexión MySQL
            try {
                await sequelize.authenticate();
                const mysqlOk = true;

                res.status(200).json({
                    status: 'healthy',
                    databases: {
                        mysql: mysqlOk ? 'connected' : 'disconnected',
                        supabase: 'ok'
                    },
                    timestamp: new Date().toISOString()
                });

            } catch (error) {
                res.status(503).json({
                    status: 'degraded',
                    databases: {
                        mysql: 'disconnected',
                        supabase: 'unknown'
                    },
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        }
};

export default AppStatus;
