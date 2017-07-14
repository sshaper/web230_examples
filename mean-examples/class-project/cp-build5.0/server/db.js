var mysql = require('mysql');
var conn = require('/web230/database_file/db');
var conn_obj = conn.db();

/* IN ORDER TO PROTECT MY PASSWORDS I CREATED AND EXPORT METHOD OUTSIDE OF THE MEAN EXAMPLES FOLDER THAT CONTAINS MY DATABASE CONNECTION INFORMATION.  THE FOLLOWING CODE REQUIRES THAT MODULE AND RETURNS THE OBJECT CONTAINING MY CONNECTION INFORMATION */
exports.connect = function(){
	var pool = mysql.createPool(conn_obj);
	return pool;
};

/* BELOW IS AN EXAMPLE OF WHAT MY CONNECTION MODULE LOOKS LIKE
exports.db = function(){
        var conn = {
                connectionLimit: 10,
                host: 'localhost',
                user: 'XXXXXXX',
                password: 'XXXXXXX',
                database: 'classProject'
        }
        return conn;

}

IF I WAS GOING TO PUT THE CONNECT INFORMATION DIRECTLY IN THE MYSQL.CREATEPOOL FUNCTIONS I WOULD WRITE THE FOLLOWING AS SHOWN:


exports.connect = function(){
	var pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'XXXX',
		password: 'XXXX',
		database: 'classProject'
	});
	return pool;

}*/

