const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

class User {
    static async findAll() {
        try {
            // Make sure to connect before any queries and close after done
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request().query('SELECT * FROM Users');
            sql.close(); // Close the connection pool
            return recordset;
        } catch (error) {
            sql.close(); // Make sure to close connection in case of error
            throw error;
        }
    }

    static async findById(id) {
        try {
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request()
                                             .input('id', sql.Int, id)
                                             .query('SELECT * FROM Users WHERE UserID = @id');
            sql.close(); // Close the connection pool
            return recordset.length > 0 ? recordset[0] : null;
        } catch (error) {
            sql.close(); // Make sure to close connection in case of error
            throw error;
        }
    }

    // Implement other methods as needed
}

module.exports = User;
