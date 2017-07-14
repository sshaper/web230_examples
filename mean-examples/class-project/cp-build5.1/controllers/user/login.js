module.exports = {
	/*LOGIN PAGE FIRST LOAD*/
     index: function(req, res){
          var url = require('url');
          var url_parts = url.parse(req.url, true);
          var query = url_parts.query;
          
          /*IF THE PERSON IS ALREADY LOGGED IN AND THEY GOT TO THIS PAGE
          THEY ARE REDIRECTED BACK TO THE ADMIN HOME PAGE.*/
          if(req.session.success){
             res.redirect('../../admin/');
           }
           /*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
           else if (query.error == 1){
              error = "You do not have access to the admin area";
              res.render('user/login',{error: error, title: 'Login Page', heading: 'Login Page'})
           }
           else{
             /*JUST THE DEFAULT LOGIN PAGE NO ERRORS.  THIS WILL BE CALLED WHEN
             THEY FIRST ACCESS THE LOGIN PAGE. THE ERROR IS SET TO AN EMPTY STRING TO CLEAR OUT ANY PAST ERROR MESSAGE.*/
             error = '';
             res.render('user/login',{error: error, title: 'Login', heading: 'Login Page', nav: true});
          }
     },

     /*THIS IS CALLED THEN THEY CLICK THE "ACCESS ADMIN AREA BUTTON"*/
     access: function(req, res){
          /*PASSWORD IS HARDCODED IN AND NOT ENCRYPTED THIS IS JUST FOR THIS EXAMPLE
          NORMALLY THIS WOULD BE STORED IN THE DATABASE AND ENCRYPTED WE WILL LOOK AT THIS LATER */
          if(req.body.password === 'password'){
               req.session.regenerate(function(err){
                    if(err){
                         console.log(err)
                    }
                    /*IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE*/
                    else{
                         req.session.success = 'access approved';
                         res.redirect('../../admin/');
                    }
 
               });
          }
          /* IF INCORRECT PASSOWORD WAS GIVEN RENDER LOGIN PAGE WITH ERROR MESSAGE*/
          else{
              res.render('user/login',{error: 'Incorrect Password'});
          }
     },

     /*THIS IS THE LOGOUT PAGE WHERE THE SESSION IS DESTROYED*/
     logout: function(req, res){
          req.session.destroy(function(err){
               if(err){
                    console.log(err);
               }
               else{
                    
                    res.redirect('/user/');
               }
          });
     }
}

