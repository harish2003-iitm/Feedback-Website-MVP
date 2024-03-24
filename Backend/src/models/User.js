const pool = require('../config/dbConfig');

class User {
    static async findAll() {
        try {
            const res = await pool.query('SELECT * FROM Users');
            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const res = await pool.query('SELECT * FROM Users WHERE UserID = $1', [id]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(userData) {
        try {
            const { name, email, password } = userData;
            const res = await pool.query(
                'INSERT INTO Users (Name, Email, PasswordHash) VALUES ($1, $2, $3) RETURNING *',
                [name, email, password]
            );
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, userData) {
        try {
            const { name, email, password } = userData;
            const res = await pool.query(
                'UPDATE Users SET Name = $1, Email = $2, PasswordHash = $3 WHERE UserID = $4 RETURNING *',
                [name, email, password, id]
            );
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            await pool.query('DELETE FROM Users WHERE UserID = $1', [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
