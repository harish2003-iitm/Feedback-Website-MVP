const pool = require('../config/dbConfig');

class Comment {
    static async findAll() {
        const res = await pool.query('SELECT * FROM Comments');
        return res.rows;
    }

    static async findById(id) {
        const res = await pool.query('SELECT * FROM Comments WHERE CommentID = $1', [id]);
        return res.rows[0];
    }

    static async create(commentData) {
        const { feedbackId, userId, commentText } = commentData;
        const res = await pool.query(
            'INSERT INTO Comments (FeedbackID, UserID, CommentText) VALUES ($1, $2, $3) RETURNING *',
            [feedbackId, userId, commentText]
        );
        return res.rows[0];
    }

    static async update(id, commentData) {
        const { commentText } = commentData;
        const res = await pool.query(
            'UPDATE Comments SET CommentText = $1 WHERE CommentID = $2 RETURNING *',
            [commentText, id]
        );
        return res.rows
        return res.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM Comments WHERE CommentID = $1', [id]);
    }
}

module.exports = Comment;

