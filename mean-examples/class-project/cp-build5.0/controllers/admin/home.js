/* I NEED TO REQUIRE THE DB FILE FOR MY DATABASE CONNECTION */
var db = require('../../modules/Conn'),
    mysql = require('mysql'),
    /* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
    pool = db.connect();

module.exports = {
    /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
        if(req.session.success){
            pool.getConnection(function(err, connection){
                if(err){
                    console.log(err);
                }
                else {
                    /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
                    var sql = "SELECT text FROM ?? WHERE name = ?";
                    var inserts = ['content','home'];
                    /* THIS BINDS THE ARRAY VALUES FROM INSERTS TO THE SQL STATEMENT THE PURPOSE OF BINDING IS TO PREVENT SQL INJECTIONS. NOTE: IN THIS CASE BECAUSE NONE OF THE VALUES WERE BEING ENTERED BY THE USER I DID NOT HAVE TO BIND THE SQL STATEMENT BUT I WANTED TO SHOW AND EXAMPLE OF IT. */
                    sql = mysql.format(sql, inserts);
                    connection.query(sql, function(error, results, fields){
                        if(error){
                            console.log(error);
                        }
                        else {
                            res.render('user/home',{pageData: results[0].text, title: 'Admin Home Page', heading: 'Admin Home Page', admin: true});
                            connection.release();

                            /* HANDLE ERROR AFTER RELEASE*/
                            if(error) throw error;
                        }
                    });
                }
            });
        }
        /*IF THERE IS NO SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
        else{
            /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
            res.redirect('/user/login/?error=1');
        }

      
    },
    about: function(req, res){
        if(req.session.success){
            pool.getConnection(function(err, connection){
                if(err){
                    console.log(err);
                }
                else {
                    /* I HAVE TO USE ?? FOR THE INDENTIFIERS AND ? FOR THE VALUES */
                    var sql = "SELECT text FROM ?? WHERE name = ?";
                    var inserts = ['content','about'];
                    /* THIS BINDS THE ARRAY VALUES FROM INSERTS TO THE SQL STATEMENT THE PURPOSE OF BINDING IS TO PREVENT SQL INJECTIONS. NOTE: IN THIS CASE BECAUSE NONE OF THE VALUES WERE BEING ENTERED BY THE USER I DID NOT HAVE TO BIND THE SQL STATEMENT BUT I WANTED TO SHOW AND EXAMPLE OF IT. */
                    sql = mysql.format(sql, inserts);
                    connection.query(sql, function(error, results, fields){
                        if(error){
                            console.log(error);
                        }
                        else {
                            res.render('user/home',{pageData: results[0].text, title: 'Admin Home Page', heading: 'Admin Home Page', admin: true});
                            connection.release();

                            /* HANDLE ERROR AFTER RELEASE*/
                            if(error) throw error;
                        }
                    });
                }
            });
        }
        /*IF THERE IS NO SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
        else{
            /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
            res.redirect('/user/login/?error=1');
        }

  
    }

}


 