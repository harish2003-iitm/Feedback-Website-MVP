// In dbConfig.js
const sql = require('mssql');

const config = {
    user: 'root',
    password: '^N_v[ESt-n8',
    database: 'sys',
    server: 'localhost', // You can use 'localhost\\instance' if connecting to your local machine
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // If connecting to Azure SQL, set this to true
        trustServerCertificate: true // If using self-signed certificates
    }
};

module.exports = config;

