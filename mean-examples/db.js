exports.db = function(){
	var conn = {
		connectionLimit: 10,
		host: 'localhost',
		user: 'root',
		password: 'karate11',
		database: 'classProject'
	}
	return conn;

}
