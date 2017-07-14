var fs = require('fs');
var documentModel = require('../../models').Document;
var js = '<script src="/public/js/Ajax.js"></script>';
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
		
	}

}