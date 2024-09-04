const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({path: `.env.${process.env.ENV || 'sso'}`});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


async function testConnection() {
    try {
        console.log('DB Host:', process.env.DB_HOST);
        console.log('DB User:', process.env.DB_USER);
        console.log('DB Password:', process.env.DB_PASSWORD);
        console.log('DB Name:', process.env.DB_NAME);
        console.log('DB Port:', process.env.DB_PORT);

        const connection = await pool.getConnection();
        console.log("Database connection successful!");
        connection.release();
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}


async function closePool() {
    try {
        await pool.end();
        console.log("Database connection pool closed.");
    } catch (error) {
        console.error("Error closing database connection pool:", error.message);
    }
}

async function executeQuery(query, params = []) {
    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    } catch (error) {
        console.error(`Error executing query: ${query}`, error.message);
        throw error;
    }
}

async function getRecordById(id) {
    const query = `SELECT *
                   FROM basic_alert
                   WHERE id = uuid_to_bin(?)`;
    const result = await executeQuery(query, [id]);
    return result[0]; // Assuming a single record is returned
}

async function deleteRuleById(alertId) {
    const query = `DELETE
                   FROM rule
                   WHERE basic_alert_id = uuid_to_bin(?)`;
    await executeQuery(query, [alertId]);
}

async function deleteRecipientById(alertId) {
    const query = `DELETE
                   FROM recipient
                   WHERE basic_alert_id = uuid_to_bin(?)`;
    await executeQuery(query, [alertId]);
}

async function deleteEnrichmentAlertById(alertId) {
    const query = `DELETE
                   FROM enrichment_alert
                   WHERE id = uuid_to_bin(?)`;
    await executeQuery(query, [alertId]);
}

async function deleteCounterAlertById(alertId) {
    const query = `DELETE
                   FROM counter_alert
                   WHERE id = uuid_to_bin(?)`;
    await executeQuery(query, [alertId]);
}

async function deleteContentAlertById(alertId) {
    const query = `DELETE
                   FROM content_alert
                   WHERE id = uuid_to_bin(?)`;
    await executeQuery(query, [alertId]);
}


async function deleteParentAlertById(alertId) {
    const query = `DELETE
                   FROM basic_alert
                   WHERE id = uuid_to_bin(?)`;
    await executeQuery(query, [alertId]);
}

async function updateAlertStatus(alertId) {
    const query = `UPDATE basic_alert
                   SET last_alert_status = 'DISABLED'
                   WHERE id = uuid_to_bin(?)`;
    await executeQuery(query, [alertId]);
}

module.exports = {
    testConnection,
    getRecordById,
    deleteRuleById,
    deleteRecipientById,
    deleteEnrichmentAlertById,
    deleteCounterAlertById,
    deleteContentAlertById,
    deleteParentAlertById,
    updateAlertStatus,
    closePool
};
