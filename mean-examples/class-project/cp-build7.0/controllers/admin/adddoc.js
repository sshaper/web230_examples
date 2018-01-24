var fs = require('fs');
var db = require('../../modules/Conn'),
    mysql = require('mysql'),
    /* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
    pool = db.connect(),
	js = '<script src="/public/js/Ajax.js"></script>';
	js += '<script src="/public/js/main.js"></script>';
module.exports = {
	index : function (req, res){
		if(req.session.success){
			res.render('admin/adddoc',{title: 'Admin Add Documents', heading: 'Admin Add Documents', admin: true, js: js});
		}
		else{
            /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
            res.redirect('/user/login/?error=1');
        }
	},
	addDoc : function (req, res){
		
		/*THIS IS THE BEST SECURITY I COULD DO WITH MULTER.  I CHECK THE MIMETYPE (WHICH CAN BE SPOOFED) AND THE FILE SIZE. ANOTHER APPROACH WOULD BE TO STORE THE FILE IN A LOCATION OUTSIDE OF THE WEB FOLDER.  */
		if (req.file.mimetype === 'application/pdf' && req.file.size < 100000){
			fs.rename('./public/docs/'+req.file.filename, './public/docs/'+req.file.filename+'.pdf', function (err) {
				if(err){
					console.log(err);
				}
				else{
					var documentData = {}
					documentData.fileName = req.body.data;
					/* MULTER CHANGES THE FILE NAMES TO A UNIQUE LETTER DIGIT COMBINATION AND REMOVES THE FILE EXTENSION SO I HAVE TO ADD THE FILE EXTENTION OF .PDF BACK ONTO THE FILE */
					documentData.filePath = '/public/docs/'+req.file.filename+'.pdf';

					pool.getConnection(function(err, connection){
		                if(err){
		                    console.log(err);
		                }
		                else {
		                    /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
		                    var sql = "INSERT INTO document (file_name, file_path) VALUES (?, ?)";
		                    var inserts = [documentData.fileName, documentData.filePath];
		                    sql = mysql.format(sql, inserts);
		                    connection.query(sql, function(error, results, fields){
		                        if(error){
		                            console.log(error);
		                            res.send('error');
		                        }
		                        else {
		                            res.send('success');
		                            connection.release();

		                            /* HANDLE ERROR AFTER RELEASE*/
		                            if(error) throw error;
		                        }
				            });
		                }
		            });
				}
			});
		}
		else {
			console.log('There is an error with file type or file size')
			res.send('error');
		}
		
	}

}