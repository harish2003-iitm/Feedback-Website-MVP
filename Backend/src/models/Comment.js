const pool = require('../config/dbConfig');

class Comment {
    static async findAll() {
        const res = await pool.query('SELECT * FROM Comments');
        return res.rows;
    }

    static async findById(commentId) {
        const res = await pool.query('SELECT * FROM Comments WHERE CommentID = $1', [commentId]);
        return res.rows[0];
    }

    static async findByFeedbackId(feedbackId) {
        const res = await pool.query('SELECT * FROM Comments WHERE FeedbackID = $1', [feedbackId]);
        return res.rows;
    }

    static async create({ FeedbackID, UserID, CommentText }) {
        const res = await pool.query(
            'INSERT INTO Comments (FeedbackID, UserID, CommentText) VALUES ($1, $2, $3) RETURNING *',
            [FeedbackID, UserID, CommentText]
        );
        return res.rows[0];
    }

    static async update(commentId, { CommentText }) {
        const res = await pool.query(
            'UPDATE Comments SET CommentText = $1 WHERE CommentID = $2 RETURNING *',
            [CommentText, commentId]
        );
        return res.rows[0];
    }

    static async delete(commentId) {
        const res = await pool.query('DELETE FROM Comments WHERE CommentID = $1', [commentId]);
        return res.rowCount;
    }
}

module.exports = Comment;
