const pool = require('../config/dbConfig');

class FeedbackCategory {
    static async findAll() {
        const res = await pool.query('SELECT * FROM FeedbackCategories');
        return res.rows;
    }

    static async findById(CategoryID) {
        const res = await pool.query('SELECT * FROM FeedbackCategories WHERE CategoryID = $1', [CategoryID]);
        return res.rows[0];
    }

    static async create({ Name, Description }) {
        const res = await pool.query(
            'INSERT INTO FeedbackCategories (Name, Description) VALUES ($1, $2) RETURNING *',
            [Name, Description]
        );
        return res.rows[0];
    }

    static async update(CategoryID, { Name, Description }) {
        const res = await pool.query(
            'UPDATE FeedbackCategories SET Name = $1, Description = $2 WHERE CategoryID = $3 RETURNING *',
            [Name, Description, CategoryID]
        );
        return res.rows[0];
    }

    static async delete(CategoryID) {
        await pool.query('DELETE FROM FeedbackCategories WHERE CategoryID = $1', [CategoryID]);
    }
}

module.exports = FeedbackCategory;
