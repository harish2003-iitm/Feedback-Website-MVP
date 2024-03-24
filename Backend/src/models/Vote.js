const pool = require('../config/dbConfig');

class Vote {
    static async findAll() {
        const res = await pool.query('SELECT * FROM Votes');
        return res.rows;
    }

    static async findByFeedbackId(feedbackId) {
        const res = await pool.query('SELECT * FROM Votes WHERE FeedbackID = $1', [feedbackId]);
        return res.rows;
    }

    static async create(voteData) {
        const { feedbackId, userId, upvote } = voteData; // Assuming 'upvote' is a boolean
        const res = await pool.query(
            'INSERT INTO Votes (FeedbackID, UserID, Upvote) VALUES ($1, $2, $3) RETURNING *',
            [feedbackId, userId, upvote]
        );
        return res.rows[0];
    }

    // Note: Updating and deleting votes might depend on your application's logic
    // For example, you might toggle a vote rather than updating/deleting directly
}

module.exports = Vote;
