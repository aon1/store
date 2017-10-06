var mysql = require('mysql');

var connection = mysql.createPool({
	connectionLimit : 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'store'
});

module.exports = connection;