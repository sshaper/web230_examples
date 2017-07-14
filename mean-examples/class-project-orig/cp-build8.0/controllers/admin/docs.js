
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
		var stuff = JSON.parse(req.body.data);
		console.log(stuff.name);
		//console.log(req.body.data);

		//console.log(req);
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
		/*HERE I AM USING THE JSON TECHIQUE FOR QUERYING THE DOCUMENT FOR ALL RECORDS, AND ONLY RETURNING THE FILENAME AND FILE PATH.  I COULD HAVE JUST AS EASILY DONE THIS "DOCUMENT.MODEL.FIND(FUNCTION(ERR, DOCS){...});  I DID NOT BECAUSE I WANTED TO DEMONSTRATE THIS TECHINIQUE AS FOUND ON THE MONGOOSE WEBSITE HTTP://MONGOOSEJS.COM/DOCS/QUERIES.HTML"*/
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
    			var path = './public/docs/'+ data.path;
    			fs.unlink(path, function(err){
    				if(err){
    					console.log(err);
    					res.send('error');
    				}
    				else{
    					res.send('success');
    				}
    				
    			});
    		}
		});
	}
}