/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var content = require('../../models').Content;

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
        /*GET THE PAGE CONTENT FROM THE DATABASE*/
        content.findOne({name: 'home'}, function(err, pageData){
			if(err){
			    console.log(err);
			}
			else{
			    /*RENDER THE HOME PAGE AND PASS IN THE OTHER REQUIRED INFORMATION
			    NOTE: WE CAN REUSE THE HOME.HANDLEBARS PAGE FOR ALL DATA THAT WILL BE SIMULAR BECAUSE THEY ARE ALL THE SAME ONLY THE CONTENT CHANGES AND THE OTHER THINGS THAT ARE BEING SENT.*/
			    res.render('user/home',{pageData: pageData.text, title: 'Home Page', heading: 'Home Page', nav: true});
			}
		});
    },
    about: function(req, res){
        /*GET THE PAGE CONTENT FROM THE DATABASE*/
        content.findOne({name: 'about'}, function(err, pageData){
			if(err){
			    console.log(err);
			}
			else{
			    /*RENDER THE HOME PAGE AND PASS IN THE OTHER REQUIRED INFORMATION
			    NOTE: WE CAN REUSE THE HOME.HANDLEBARS PAGE FOR ALL DATA THAT WILL BE SIMULAR BECAUSE THEY ARE ALL THE SAME ONLY THE CONTENT CHANGES AND THE OTHER THINGS THAT ARE BEING SENT.  IN THIS EXAMPLE I CREATED AN ABOUT PAGE*/
			    res.render('user/home',{pageData: pageData.text, title: 'About Us Page', heading: 'About Us Page', nav: true});
			}
		});
    }

}
