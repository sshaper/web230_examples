var db = require('../../modules/Conn'),
	mysql = require('mysql'),
	/* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
	pool = db.connect(),
js = '<script src="/public/js/main.js"></script>';

module.exports = {
	showDoc : function(req, res){
		
		pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
                var sql = "SELECT * FROM document";
                /*var inserts = [documentData.fileName, documentData.filePath];
                sql = mysql.format(sql, inserts);*/
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                     }
                    else {
                        res.render('user/docs', {docs: results, title: 'Show Documents', heading: 'Show Documents', nav: true, js: js });
                        connection.release();

                        /* HANDLE ERROR AFTER RELEASE*/
                        if(error) throw error;
                    }
	            });
            }
        });

	}
}