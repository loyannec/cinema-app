const mysql = require('mysql');

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password'
});

module.exports = connection;