/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var content = require('../../models').Content;

module.exports = {
    /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
                /*GET THE PAGE CONTENT FROM THE DATABASE*/
                if(req.session.success){
                    /* EVEN THOUGH WE ARE ON THE ADMIN HOME PAGE WE ARE BRINGING IN THE CONTENT FOR THE HOME PAGE BECAUSE WE WILL BE MODFIYING IT HERE.*/
                    content.findOne({name: 'home'}, function(err, pageData){
                        if(err){
                            console.log(err);
                        }
                        else{
                           res.render('admin/home',{pageData: pageData.text, title: 'Admin Home Page', heading: 'Admin Home Page', admin: true}); 
                        }
                    });
                }
                /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
                else{
                    /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
                    res.redirect('/user/login/?error=1');
                }
        },
    about: function(req, res){
                /*GET THE PAGE CONTENT FROM THE DATABASE*/
                if(req.session.success){
                    /* EVEN THOUGH WE ARE ON THE ADMIN ABOUT PAGE WE ARE BRINGING IN THE CONTENT FOR THE ABOUT PAGE BECAUSE WE WILL BE MODFIYING IT HERE.*/
                    content.findOne({name: 'about'}, function(err, pageData){
                        if(err){
                            console.log(err);
                        }
                        else{
                           res.render('admin/home',{pageData: pageData.text, title: 'Admin About Page', heading: 'Admin About Page', admin: true}); 
                        }
                    });
                }
                /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
                else{
                    /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
                    res.redirect('/user/login/?error=1');
                }
        }
}
 