const db = require('../config/dbConfig');

class Vote {
    static async findAll() {
        const query = 'SELECT * FROM Votes';
        const { rows } = await db.query(query);
        return rows;
    }

    static async findByFeedbackId(feedbackId) {
        const query = 'SELECT * FROM Votes WHERE FeedbackID = $1';
        const { rows } = await db.query(query, [feedbackId]);
        return rows;
    }

    // Additional methods for CRUD operations can be added here
}

module.exports = Vote;
