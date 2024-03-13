const db = require('../config/dbConfig');

class Comment {
    static async findAll() {
        const query = 'SELECT * FROM Comments';
        const { rows } = await db.query(query);
        return rows;
    }

    static async findById(id) {
        const query = 'SELECT * FROM Comments WHERE CommentID = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    // Additional methods for CRUD operations can be added here
}

module.exports = Comment;
