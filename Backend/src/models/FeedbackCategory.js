const db = require('../config/dbConfig');

class FeedbackCategory {
    static async findAll() {
        const query = 'SELECT * FROM FeedbackCategories';
        const { rows } = await db.query(query);
        return rows;
    }

    static async findById(id) {
        const query = 'SELECT * FROM FeedbackCategories WHERE CategoryID = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    // Add more methods as needed for CRUD operations
}

module.exports = FeedbackCategory;
