const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'umairmaqbool',
  database: 'airbnb',
});

module.exports = pool.promise();

