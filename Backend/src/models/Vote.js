const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

class Vote {
    static async findAll() {
        try {
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request().query('SELECT * FROM Votes');
            sql.close();
            return recordset;
        } catch (error) {
            sql.close();
            throw error;
        }
    }

    static async findByFeedbackId(feedbackId) {
        try {
            let pool = await sql.connect(dbConfig);
            const { recordset } = await pool.request()
                                             .input('feedbackId', sql.Int, feedbackId)
                                             .query('SELECT * FROM Votes WHERE FeedbackID = @feedbackId');
            sql.close();
            return recordset;
        } catch (error) {
            sql.close();
            throw error;
        }
    }
}

module.exports = Vote;
