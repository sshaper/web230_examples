/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var content = require('../../models').Content;
var adminModel = require('../../models').Admin;
var tinyMCE = '<script src="//cdn.tinymce.com/4/tinymce.min.js"></script><script src="/public/js/tinymce.js"></script>';
var js = '<script src="/public/js/Ajax.js"></script>';
js += '<script src="/public/js/main.js"></script>';
var EE = require('events').EventEmitter;
var ee = new EE();
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
                           res.render('admin/home',{pageData: pageData.text, title: 'Admin Home Page', heading: 'Admin Home Page', admin: true, tinyMCE: tinyMCE, js: js}); 
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
                           res.render('admin/home',{pageData: pageData.text, title: 'Admin About Page', heading: 'Admin About Page', admin: true, tinyMCE: tinyMCE, js: js}); 
                        }
                    });
                }
                /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
                else{
                    /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
                    res.redirect('/user/login/?error=1');
                }
        },
    adminform: function(req, res){
        if(req.session.success){
            res.render('admin/addadmin',{title: 'Add Administrator', heading: 'Add Administrator', admin: true, js: js});
        }
    },

    addadmin: function(req, res){
        var data = JSON.parse(req.body.data);

        /*REQUIRE BCRYPT AND SET THE SALT ROUNDS*/
        var bcrypt = require('bcrypt');
        var saltRounds = 10;
        var pw = data.pw;
        /* var documentData = {}  HAD TO MOVE THIS TO THE CHECK ADMIN NAME FUNCTION */
        bcrypt.hash(pw, saltRounds, function(err, hash){
            if(err){
                console.log(err);
            }
            else {
                /* I HAD TO PASS THE HASH, USERNAME (DATA.US) AND RESPONSE OBJECT (RES) AS PARAMETERS TO THE CHECKINSERTADMIN FUNCTION */
                
                var username = data.un;
                
                ee.emit('test');
                console.log(ee);

                ee.on('test', function(){
                    console.log('it works');
                    //checkInsertAdmin(hash, username, res)
                });
                res.send('test');

                //checkInsertAdmin(hash, data.un, res);
            }
            
        });

    },

    postindex: function(req, res){
        var data = req.body.data
        content.update({name: 'home'}, {text: data}, {runValidators: false}, function(err){
            if(err){
                /*SENDS THE ERROR TO CONSOLE.LOG*/
                console.log(err);
                res.send('error');
            }
            else{
                res.send('success');
            }
            
        });
    },
    postabout: function(req, res){
        var data = req.body.data
        content.update({name: 'about'}, {text: data}, {runValidators: false}, function(err){
            if(err){
                /*SENDS THE ERROR TO CONSOLE.LOG*/
                console.log(err);
                res.send('error');
            }
            else{
                res.send('success');
            }
            
        });        
    }
}

function checkInsertAdmin(hashedPw, username, res){
    var msg = '';
    var documentData = {};
    documentData.password = hashedPw;
    documentData.username = username;
    
    /*CHECK FOR THE USERNAME TO EXIST*/
    adminModel.findOne({username: documentData.username}, function(err, name){
        if(err){
            console.log(err);
        }
        else{
           /*IF THE USERNAME IS NOT FOUND ENTER THE USERNAME AND THE PASSWORD*/
            if(name === null){
                var admin = new adminModel(documentData);
                admin.save(function(err){
                    if(err){
                        res.send('System Error Cannot Login');
                    }
                    else {
                        res.send('Admin Account Created');
                    }
                });
           }
           /*IF THE USERNAME IS FOUND TELL THE USER THAT USERNAME IS ALREADY IN USE.*/
           else {
                res.send('Username already in use please pick another');
           }
           
         }
    });
};
 