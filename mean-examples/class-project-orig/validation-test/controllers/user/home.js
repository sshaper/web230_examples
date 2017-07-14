var val = require('../../modules/validation.js');

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
        res.render('user/home',{pageData: "Welcome to the home page", title: 'Home Page', heading: 'Home Page', nav: true});
    },
    getTestForm: function(req, res){
    	res.render('user/testform',{title: 'Test Form', heading: 'Test form', nav: true});
    },

    postTestForm: function(req, res){
    	var data = JSON.parse(req.body.data);
    	var ret = val.validation(data);
    	ret = JSON.stringify(ret);
    	res.send(ret);
    }

}
