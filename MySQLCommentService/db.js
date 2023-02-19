

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'user66',
    password : '1234',
    database : 'accounting'
});

 
module.exports = connection;