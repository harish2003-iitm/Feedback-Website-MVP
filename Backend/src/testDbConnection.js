const pool = require('./config/dbConfig'); // Adjust the path as necessary

async function testDBConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connection successful, current time:', res.rows[0].now);
    } catch (err) {
        console.error('Database connection error', err.stack);
    }
}

testDBConnection();
