
var fs = require('fs');
var documentModel = require('../../models').Document;
var js = '<script src="/public/js/Ajax.js"></script>';
js += '<script src="/public/js/main.js"></script>';

/*I DECIDED TO MAKE THIS MODULE EXPORT CONTAIN MEHTHODS FOR BOTH THE ADDDOC.HANDLEBARS AND SHOWDOC.HANDLEBARS VIEWS.  */
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
		if (req.file.mimetype === 'application/pdf' && req.file.size < 50000){
			fs.rename('./public/docs/'+req.file.filename, './public/docs/'+req.file.filename+'.pdf', function (err) {
				if(err){
					console.log(err);
				}
				else{
					var documentData = {}
					documentData.fileName = req.body.data;
					documentData.filePath = '/public/docs/'+req.file.filename+'.pdf';

					var doc = new documentModel(documentData);
					doc.save(function(err){
						if(err){
							res.send('error');
						}
						else {
							res.send('success');
						}
					});

				}
			});
		}
		else {
			res.send('error');
		}
		
	},
	showDoc : function(req, res){
		/*HERE I AM USEING THE JSON TECHIQUE FOR QUERYING THE DOCUMENT FOR ALL RECORDS, AND ONLY RETURNING THE FILENAME AND FILE PATH.  I COULD HAVE JUST AS EASILY DONE THIS "DOCUMENT.MODEL.FIND(FUNCTION(ERR, DOCS){...});  I DID NOT BECAUSE I WANTED TO DEMONSTRATE THIS TECHINIQUE AS FOUND ON THE MONGOOSE WEBSITE HTTP://MONGOOSEJS.COM/DOCS/QUERIES.HTML"*/
		documentModel.find({}).
		select({fileName: 1, filePath: 1, _id: 1}).
		exec(function(err, docs){
			if(err){
				console.log(err);
			}
			else{
				if(req.session.success){
					res.render('admin/showdoc', {docs: docs, title: 'Admin Show/Remove Documents', heading: 'Admin Show/Remove Documents', admin: true, js: js });
				}
				else{
					res.redirect('/user/login/?error=1');
				}
			}
		});
	},
	deleteDoc : function(req, res){
		var data = JSON.parse(req.body.data);
		
		/*REMOVE THE DOCUMENT FROM THE DATABASE FIRST*/
		documentModel.findByIdAndRemove(data.id, function (err){
    		if(err){
    			console.log(err);
    			res.send('error');
    		}
    		/*IF SUCCESSFULLY REMOVED FROM THE DATABASE REMOVE IT FROM THE FOLDER.*/
    		else {
    			documentModel.find({}).
				select({fileName: 1, filePath: 1, _id: 1}).
				exec(function(err, docs){
					console.log(docs);
					var table = createTable(docs);
					res.send('success^^^'+table);
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
		table += '<td><a href="'+data[i].filePath+'">'+data[i].fileName+'</a></td>';
		table += '<td id="'+data[i]._id+'" class="link">Delete</td>';
		table += '</tr>';
		i++;
	}
	table += '</tbody></table>';
	return table;
}