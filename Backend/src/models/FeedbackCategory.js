const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

class FeedbackCategory {
    static async findAll() {
        try {
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request().query('SELECT * FROM FeedbackCategories');
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
                                             .query('SELECT * FROM FeedbackCategories WHERE CategoryID = @id');
            sql.close();
            return recordset.length > 0 ? recordset[0] : null;
        } catch (error) {
            sql.close();
            throw error;
        }
    }
}

module.exports = FeedbackCategory;
