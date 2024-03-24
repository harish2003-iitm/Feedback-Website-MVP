const pool = require('../config/dbConfig');

class FeedbackCategory {
    static async findAll() {
        const res = await pool.query('SELECT * FROM FeedbackCategories');
        return res.rows;
    }

    static async findById(id) {
        const res = await pool.query('SELECT * FROM FeedbackCategories WHERE CategoryID = $1', [id]);
        return res.rows[0];
    }

    static async create(categoryData) {
        const { name, description } = categoryData;
        const res = await pool.query(
            'INSERT INTO FeedbackCategories (Name, Description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        return res.rows[0];
    }

    static async update(id, categoryData) {
        const { name, description } = categoryData;
        const res = await pool.query(
            'UPDATE FeedbackCategories SET Name = $1, Description = $2 WHERE CategoryID = $3 RETURNING *',
            [name, description, id]
        );
        return res.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM FeedbackCategories WHERE CategoryID = $1', [id]);
    }
}

module.exports = FeedbackCategory;
