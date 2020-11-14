const { Pool } = require('pg');
const pool = new Pool({
    user: 'admin',
    host: 'db',
    database: 'course-db',
    password: 'password',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};