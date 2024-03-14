const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

class Comment {
    static async findAll() {
        try {
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request().query('SELECT * FROM Comments');
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
                                             .query('SELECT * FROM Comments WHERE CommentID = @id');
            sql.close();
            return recordset.length > 0 ? recordset[0] : null;
        } catch (error) {
            sql.close();
            throw error;
        }
    }
}

module.exports = Comment;
