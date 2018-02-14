var validate = require('../../modules/validation.js');

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
        res.render('user/home',{pageData: "Welcome to the home page", title: 'Home Page', heading: 'Home Page', nav: true});
    },
    getTestForm: function(req, res){
    	res.render('user/testform',{title: 'Test Form', heading: 'Test form', nav: true});
    },

    postTestForm: function(req, res){
    	var data, i = 0;
        data = JSON.parse(req.body.data);

        while(i < data.elements.length){
            if(!validate.validate(data.elements[i].value, data.elements[i].regex)){
                data.elements[i].status = "error";
                data.masterstatus = "error";
            }

            i++;
        }

        if(data.masterstatus === "error"){
            data = JSON.stringify(data);
            res.send(data);
        }
        else {
            data.masterstatus = "success";
            data = JSON.stringify(data);
            res.send(data);
        }

    }

}
