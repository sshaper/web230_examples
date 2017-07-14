var fs = require('fs');
var db = require('../../server/db'),
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
		
	},
	showDoc : function(req, res){
		
		pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
                var sql = "SELECT * FROM document";
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                     }
                    else {
                        res.render('admin/showdoc', {docs: results, title: 'Admin Show/Remove Documents', heading: 'Admin Show/Remove Documents', admin: true, js: js });
                        connection.release();

                        /* HANDLE ERROR AFTER RELEASE*/
                        if(error) throw error;
                    }
	            });
            }
        });

	},
	deleteDoc : function(req, res){
		var data = JSON.parse(req.body.data);
		pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
                var sql = "DELETE FROM document WHERE id=?";
                var inserts = [data.id];
                sql = mysql.format(sql, inserts);
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                     }
                    /*IF SUCCESSFULLY REMOVED FROM THE DATABASE REMOVE IT FROM THE FOLDER.*/
		    		else {
		    			var path = './public/docs/'+ data.path;
		    			fs.unlink(path, function(err){
		    				if(err){
		    					console.log(err);
		    					res.send('error');
		    				}
		    				else{
		    					/* REQUERY THE DATABASE AND GET ALL THE DOCUMENTS */
		    					pool.getConnection(function(err, connection){
						            if(err){
						                console.log(err);
						            }
						            else {
						                var sql = "SELECT * FROM document";
						                connection.query(sql, function(error, results, fields){
						                    if(error){
						                        console.log(error);
						                        res.send('error');
						                     }
						                    else {
						                        /* CREATE THE NEW TABLE BASED UPON THE DATABASE QUERY */
						                        var table = createTable(results);
						                        
						                        /* SEND THE TABLE TO THE CLIENT WITH A SUCCESS MESSAGE */
												res.send('success^^^'+table);
						                        connection.release();

						                        /* HANDLE ERROR AFTER RELEASE*/
						                        if(error) throw error;
						                    }
							            });
						            }
						        });
		    					
				    			connection.release();
				    			
		                        if(error) throw error;
		    				}
	            		});
            		}
        		});
			}
		});
	}
}

/* IN THIS EXAMPLE I WILL CREATE THE TABLE ON THE SERVER AND SEND IT BACK VIA AJAX.  I COULD HAVE JUST SENT THE JSON STRINGIFIED OBJECT BACK AND CREATE THE TABLE ON THE CLIENT SIDE BUT I WANTED TO DEMONSTRATE THIS TECHNIQUE  NOTICE HOW I HAVE THE FUNCTION OUTSIDE OF THEM MODEL EXPORT.  WHEN I ATTEMPTED TO PUT THE FUNCTION WITHIN THE MODULE EXPORT IT DID NOT WORK. ALSO NOTICE THAT I COULD PASS THE OBJECT(DOCS) DIRECTLY I DID NOT HAVE TO STRINGIFY IT FIRST, THAT IS BECAUSE IT IS ON THE SAME SERVER AND IS NOT GOING ACROSS THE INTERNET.*/
function createTable(data){
	var len = data.length;
	var i = 0;
	var table = '<table class="table table-striped table-bordered">';
	table += '<thead>';
	table += '<tr>';
	table += '<th style="width: 70%">File Name</th><th style="width: 30%">Delete File</th>';
	table += '</tr></thead><tbody>';

	while(i < len){
		table += '<tr>';
		table += '<td><a href="'+data[i].file_path+'">'+data[i].file_name+'</a></td>';
		table += '<td id="'+data[i].id+'" class="link">Delete</td>';
		table += '</tr>';
		i++;
	}
	table += '</tbody></table>';
	return table;
}

