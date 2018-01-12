var mysql = require('mysql');
var conn = require('../../../db');
var conn_obj = conn.db();

/* THOUGH WITH NODE IT IS NOT A BIG DEAL BUT I STORED BY DATABASE INFORMATION IN A FILE OUTSIDE OF THE WEB SERVER FILES TO BE MORE SECURE AND TO PROVIDE A CENTRAL LOCATION FOR  THE CONNECTION INFORMATION.  THAT IS WHY MY FILE IS REQUIRED FROM THE ROOT PATH OF /web230/database_file/db*/
exports.connect = function(){
	var pool = mysql.createPool(conn_obj);
	return pool;
};
