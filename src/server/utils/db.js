const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Duc[992299]V',
    database: 'project_movie'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database');
});

module.exports = db;
