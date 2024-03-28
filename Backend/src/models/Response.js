const pool = require('../config/dbConfig');

class Response {
    static async findAll() {
        const res = await pool.query('SELECT * FROM Responses');
        return res.rows;
    }

    static async findByFeedbackId(feedbackId) {
        const res = await pool.query('SELECT * FROM Responses WHERE feedbackId = $1', [feedbackId]);
        return res.rows;
    }

    static async create({ feedbackId, responseText }) {
        const res = await pool.query(
            'INSERT INTO Responses (feedbackId, responseText) VALUES ($1, $2) RETURNING *',
            [feedbackId, responseText]
        );
        return res.rows[0];
    }

    static async update(id, { responseText }) {
        const res = await pool.query(
            'UPDATE Responses SET responseText = $1, updatedAt = NOW() WHERE id = $2 RETURNING *',
            [responseText, id]
        );
        return res.rows[0];
    }

    static async delete(id) {
        const res = await pool.query('DELETE FROM Responses WHERE id = $1', [id]);
        return res.rowCount;
    }
}

module.exports = Response;