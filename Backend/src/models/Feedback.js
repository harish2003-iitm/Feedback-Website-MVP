const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

class Feedback {
    static async findAll() {
        try {
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request().query('SELECT * FROM Feedback');
            sql.close();
            return recordset;
        } catch (error) {
            sql.close();
            throw error;
        }
    }

    static async findById(id) {
        try {
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request()
                                             .input('id', sql.Int, id)
                                             .query('SELECT * FROM Feedback WHERE FeedbackID = @id');
            sql.close();
            return recordset.length > 0 ? recordset[0] : null;
        } catch (error) {
            sql.close();
            throw error;
        }
    }
}

module.exports = Feedback;
