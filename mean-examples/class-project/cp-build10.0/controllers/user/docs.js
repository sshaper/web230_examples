var documentModel = require('../../models').Document;
js = '<script src="/public/js/main.js"></script>';

module.exports = {
	showDoc : function(req, res){
		/*HERE I AM USEING THE JSON TECHIQUE FOR QUERYING THE DOCUMENT FOR ALL RECORDS, AND ONLY RETURNING THE FILENAME AND FILE PATH.  I COULD HAVE JUST AS EASILY DONE THIS "DOCUMENT.MODEL.FIND(FUNCTION(ERR, DOCS){...});  I DID NOT BECAUSE I WANTED TO DEMONSTRATE THIS TECHINIQUE AS FOUND ON THE MONGOOSE WEBSITE HTTP://MONGOOSEJS.COM/DOCS/QUERIES.HTML"*/
		documentModel.find({}).
		select({fileName: 1, filePath: 1, _id: 1}).
		exec(function(err, docs){
			if(err){
				console.log(err);
			}
			else{
				res.render('user/docs', {docs: docs, title: 'Show Documents', heading: 'Show Documents', nav: true, js: js});
			}
		});
	}
}