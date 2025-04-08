require("dotenv").config();
const mysql = require("mysql2/promise"); // Changed to mysql2 with promise support

let instance = null;
let connection = null;

// Immediately invoked async function to create connection at module load time
(async function initializeConnection() {
    try {
        connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: process.env.DB_PORT,
            database: process.env.DATABASE,
            multipleStatements: true,
        });

        console.log("database is connected");
    } catch (err) {
        console.log("Connection error:", err.message);
    }
})();

class DbServices {
    static getDbServiceInstance() {
        return instance ? instance : new DbServices();
    }

    async getAllHouses() {
        try {
            // Ensure connection exists
            if (!connection) {
                throw new Error("Database connection not established");
            }

            // Use the promise-based API with await
            const query = "SELECT * FROM contact_person";
            const [rows] = await connection.execute(query);
            // console.log(rows);
            return rows;
        } catch (error) {
            console.log(error);
            throw error; // Re-throw for proper handling upstream
        }
    }
}

// Create the singleton instance
instance = new DbServices();

module.exports = DbServices;