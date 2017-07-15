var db = require('../../server/db'),
    mysql = require('mysql'),
    /* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
    pool = db.connect();
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
          pool.getConnection(function(err, connection){
            if(err){
              console.log(err);
            }
            else {
              /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
              var sql = "SELECT username, password FROM admin WHERE username = ?";
              var inserts = [req.body.username];
              /* THIS BINDS THE ARRAY VALUES FROM INSERTS TO THE SQL STATEMENT THE PURPOSE OF BINDING IS TO PREVENT SQL INJECTIONS. NOTE: IN THIS CASE BECAUSE NONE OF THE VALUES WERE BEING ENTERED BY THE USER I DID NOT HAVE TO BIND THE SQL STATEMENT BUT I WANTED TO SHOW AND EXAMPLE OF IT. */
              sql = mysql.format(sql, inserts);
              connection.query(sql, function(error, results, fields){
                if(error){
                  console.log(error);
                }
                else {
                  /* IF NO USERNAME WAS FOUND THEN RETURN TO USER.  IF IT WAS FOUND THEN CHECK THE PASSWORD */
                  if(results.length == 0){
                    res.render('user/login',{error: 'No record found with that username and/or password'});
                  }
                  else{
                    var bcrypt = require('bcrypt');
                    bcrypt.compare(req.body.password, results[0].password, function(err, response) {
                        if(response){
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
                        else {
                          res.render('user/login',{error: 'Incorrect Username and/or Password'});
                        }
                    });
                  }//end else

                  connection.release();
                  if(error) throw error;
                }
              });//end connection
            }
          });

          /*PASSWORD IS HARDCODED IN AND NOT ENCRYPTED THIS IS JUST FOR THIS EXAMPLE
          NORMALLY THIS WOULD BE STORED IN THE DATABASE AND ENCRYPTED WE WILL LOOK AT THIS LATER */
          /*if(req.body.password === 'password'){
               req.session.regenerate(function(err){
                    if(err){
                         console.log(err)
                    }
                    /*IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE
                    else{
                         req.session.success = 'access approved';
                         res.redirect('../../admin/');
                    }
 
               });
          }
          /* IF INCORRECT PASSOWORD WAS GIVEN RENDER LOGIN PAGE WITH ERROR MESSAGE
          else{
              res.render('user/login',{error: 'Incorrect Password'});
          }*/
     },

     /*THIS IS CALLED WHEN THEY CLICK THE SUBMIT BUTTON ON THE LOGIN FORM
     access: function(req, res){
          admin.findOne({username: req.body.username}, function(err, data){
              if(data === null){
                  res.render('user/login',{error: 'No record found with that username and password'});
              }
              else {
                var bcrypt = require('bcrypt');
                bcrypt.compare(req.body.password, data.password, function(err, response) {
                    if(response){
                      req.session.regenerate(function(err){
                        if(err){
                             console.log(err)
                        }
                        /*IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE
                        else{
                             req.session.success = 'access approved';
                             res.redirect('../../admin/');
                        }
 
                      });

                    } 
                    else {
                      res.render('user/login',{error: 'Incorrect Username or Password'});
                    }
                });

              }
          });
      },*/

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

