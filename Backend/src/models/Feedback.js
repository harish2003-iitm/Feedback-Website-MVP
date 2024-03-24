const pool = require('../config/dbConfig');

class Feedback {
    static async findAll() {
        const res = await pool.query('SELECT * FROM Feedback');
        return res.rows;
    }

    static async findById(id) {
        const res = await pool.query('SELECT * FROM Feedback WHERE FeedbackID = $1', [id]);
        return res.rows[0];
    }

    static async create(feedbackData) {
        const { title, description, userId, categoryId } = feedbackData;
        const res = await pool.query(
            'INSERT INTO Feedback (Title, Description, UserID, CategoryID) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, userId, categoryId]
        );
        return res.rows[0];
    }

    static async update(id, feedbackData) {
        const { title, description, categoryId } = feedbackData;
        const res = await pool.query(
            'UPDATE Feedback SET Title = $1, Description = $2, CategoryID = $3 WHERE FeedbackID = $4 RETURNING *',
            [title, description, categoryId, id]
        );
        return res.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM Feedback WHERE FeedbackID = $1', [id]);
    }
}

module.exports = Feedback;
