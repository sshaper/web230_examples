var fs = require('fs');
	xml2js = require('xml2js');
    bodyparser = require('body-parser')
module.exports = {
	index: function(req, res){
        res.render('user/home',{title: 'Home Page', heading: 'Home Page', nav: true});
    },
    getpage: function(req, res){
    	res.render('user/get',{title: 'Get Example', heading: 'Get Example', nav: true});
    },
    getexample: function(req, res){
    	res.send('Hello Class I was retrieved via an AJAX reqest');
    },
    getjsonpage: function(req, res){
    	res.render('user/getjson',{title: 'Get JSON', heading: 'Get JSON', nav: true});
    },
    getjson: function(req, res){
    	fs.readFile('data/books.txt', function(err, data){
    		res.send(data);
    	});
    },
    getxmlpage: function(req, res){
    	res.render('user/getxml',{title: 'Get XML', heading: 'Get XML', nav: true});
    },
    getxml: function(req, res){
    	/*I USED THE XML2JS MODULE TO PARSE THE XML INTO A JSON OBJECT I COULD HAVE RETURNED THE XML AS A STRING AND THEN ON THE FRONT END CREATED AN XML OBJECT FROM THE STRING, BUT I LIKE THE XML2JS MODULE BETTER BECAUSE IT CONVERST TO A JSON OBJECT WHICH IS MORE SUITED FOR JAVASCRIPT.*/
        fs.readFile('data/books.xml', function(err, data){
    		var parser = new xml2js.Parser();
    		json = parser.parseString(data, function(err, result){
    			res.send(JSON.stringify(result));
    		});
    		
    	});
    },
    postpage: function(req, res){
        res.render('user/post',{title: 'Post Example', heading: 'Post Example', nav: true})
    },

    post: function(req, res){
        /* SINCE I SENT THIS AS A JSON STRING I HAD TO PARSE THE STRING BACK INTO AN OBJECT IN ORDER TO GET THE VALUES */
        data = JSON.parse(req.body.data);
        var output = '';
        output += "My first name is " + data.firstname;
        output += " and my last name is " + data.lastname;
        res.send(output);
     }


}
