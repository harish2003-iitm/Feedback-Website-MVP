const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'intern',
    password: '^N_v[ESt-n8', // Replace with your actual password
    port: 5432,
});

module.exports = pool;
