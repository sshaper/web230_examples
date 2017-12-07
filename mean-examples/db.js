exports.db = function(){
	var conn = {
		connectionLimit: 10,
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'classProject'
	}
	return conn;

}
