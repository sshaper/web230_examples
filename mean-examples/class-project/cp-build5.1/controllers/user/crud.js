var db = require('../../modules/Conn'),
    mysql = require('mysql'),
    /* I NEED TO CREATE THE CONNECTION HERE (INSTEAD OF IN MODULE EXPORTS) OTHERWISE I WILL CREATE TOO MANY CONNECTIONS WHEN TOO MANY CONCURRENT USERS ACCESS THE DATABASE */
    pool = db.connect();

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    shownames: function(req, res){
        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                var sql = "SELECT * FROM name";
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                    }
                    else {
                        res.render('user/shownames',{title: 'Show Names', crud: true, names: results});
                        connection.release();
                        if(error) throw error;
                    }
                });
            }
        });


        
    },
    addnameform: function(req, res){
        res.render('user/addname', {title: 'Add Names', crud: true});
    },

    addname: function(req, res){
    	/* REQUEST BODY IS A JSON STRING BUT I HAVE TO STRINGIFY IT BEFORE I CAN PARSE IT OTHERWISE I GET AN ERROR*/
    	var data = JSON.stringify(req.body);
    	data = JSON.parse(data);

        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                var sql = "INSERT INTO name (first_name, last_name, email) VALUES (?, ?, ?)";
                var inserts = [data.fname, data.lname, data.email];
                sql = mysql.format(sql, inserts);

                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                    }
                    else {
                        res.render('user/addname',{title: 'Show Names', crud: true, msg: 'Name Added'});
                        connection.release();
                        if(error) throw error;
                    }
                });
            }
        });
    	
    	
    },

    updatenameslist: function(req, res){
        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                var sql = "SELECT * FROM name";
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                    }
                    else {
                        res.render('user/updatenames',{title: 'Update Names', crud: true, names: results});
                        connection.release();
                        if(error) throw error;
                    }
                });
            }
        });

       
    },

    updatenames: function(req, res){
        var data = JSON.stringify(req.body);
        data = JSON.parse(data);

        var len = data.fname.length; /* I ONLY NEED ONE LENGTH AS IT WILL BE THE LENGTH OF THEM ALL.*/ 
        var i = 0;
        
        submitData();
        
        /*

        THIS IS THE STRUCTURE OF THE RETURNED OBJECT NAMED DATA. NOTICE HOW I HAVE THE FIELD NAME THEN AN ARRAY OF VALUES.  IN THE SUBMIT DATA FUNCITON YOU WILL SEE A RECURSIVE FUNCTION THAT WILL GO THROUGH ALL THE OBJECT PROPERTIES AND THEIR ARRAYS.

        { fname: [ 'Scott', 'Karen', 'Jazzy' ],
          lname: [ 'Shaper', 'Shaper', 'Shaper' ],
          email: [ 'sshaper@test.com', 'kshaper@test.com', 'jshaper@test.com' ],
          hiddenId: [ '1', '2', '3' ] }
        */



        function submitData(){
            pool.getConnection(function(err, connection){
                if(err){
                    console.log(err);
                }
                else {
                    var sql = "UPDATE name SET first_name=?, last_name=?, email=? WHERE id=?";
                    
                    /* I USE PARAMETER BINDING HERE TO ELEMINATE SQL INJECTION */
                    var inserts = [data.fname[i], data.lname[i], data.email[i], data.hiddenId[i]];

                    i++;
                    sql = mysql.format(sql, inserts);
                    connection.query(sql, function(error, results, fields){
                        if(error){
                            console.log(error);
                        }
                        else {
                            /* THIS IS A RECURSIVE FUNCTION THAT LOOPS THROUGH ALL THE RETURNED NAMES AND UPDATES THEM WHETHER THEY WERE TO BE UPDATED OR NOT.  I HAVE TO WAIT UNTIL THE FUNCTION CALLS  BACK BEFORE I CAN DO THE NEXT QUERY SO I NEED TO USE A RECURSIVE FUNCTION INSTEAD OF A LOOP.*/
                            if(i < len){
                                submitData();
                            }
                            else{
                                /* ONCE I HAVE GONE THROUGH ALL THE NAMES I RUN THE GETNAMES FUNCTION TO GET AND LIST ALL THE UPDATED AND NOT UPDATED NAMES*/
                                getNames();
                            }
                        }
                    });
                }
            });

            function getNames(){
                pool.getConnection(function(err, connection){
                    if(err){
                        console.log(err);
                    }
                    else {
                        var sql = "SELECT * FROM name";
                        connection.query(sql, function(error, results, fields){
                            if(error){
                                console.log(error);
                            }
                            else {
                                res.render('user/updatenames',{title: 'Update Names', crud: true, names: results, acknowledgment: "Names updated"});
                                connection.release();
                                if(error) throw error;
                            }
                        });
                    }
                });    
            }            

            
        }
    },

    deletenameslist: function(req, res){
        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }
            else {
                var sql = "SELECT * FROM name";
                connection.query(sql, function(error, results, fields){
                    if(error){
                        console.log(error);
                    }
                    else {
                        res.render('user/deletenames',{title: 'Delete Names', crud: true, names: results});
                        connection.release();
                        if(error) throw error;
                    }
                });
            }
        });

        
    },

    deletenames: function(req, res){
        var data = JSON.stringify(req.body.deleteId);
        data = JSON.parse(data);
        var i = 0;
        var len = 0;

        /* IF MORE THAN ONE NAME IS CHECKED THEN AN ARRAY WILL BE RETURNED OTHERWISE JUST A NUMBER IS RETURNED.  SO I FIRST CHECK TO SEE IF IT IS AN ARRAY (CHECKING FOR THE OBJECT).  IF IT IS THEN I WRITE A RECURIVE FUNCTION TO DELETE ALL THE RECORDS BY THEIR ID'S*/
        if(typeof data == 'object'){
            len = data.length;
            deleteRecords();

            function deleteRecords(){
                pool.getConnection(function(err, connection){
                    if(err){
                        console.log(err);
                    }
                    else {
                        var sql = "DELETE FROM name WHERE id= ?";
                        var inserts = [data[i]];

                        i++;
                        sql = mysql.format(sql, inserts);
                        connection.query(sql, function(error, results, fields){
                            if(error){
                                console.log(error);
                            }
                            else {
                                if(i < len){
                                    deleteRecords()
                                }
                                else{
                                    shownames()
                                }
                            }
                        });
                    }
                });

            }
        }//END IF
        /* IF ONLY ONE RECORD IS BEING DELETED THEN A NUMBER IS PASSED AND WE JUST DELETE THE ONE RECORD*/
        else {
            pool.getConnection(function(err, connection){
                if(err){
                    console.log(err);
                }
                else {
                    var sql = "DELETE FROM name WHERE id= ?";
                    var inserts = [data];

                    sql = mysql.format(sql, inserts);
                    connection.query(sql, function(error, results, fields){
                        if(error){
                            console.log(error);
                        }
                        else {
                            shownames();
                        }
                    });
                }
            });
        }


        /* SINCE BOTH OPERATION USE THE SHOWNAMES FUNCTION I WROTE IT DOWN HER SO BOTH COULD ACCESS IT.*/
        function shownames(){
                pool.getConnection(function(err, connection){
                    if(err){
                        console.log(err);
                    }
                    else {
                        var sql = "SELECT * FROM name";
                        connection.query(sql, function(error, results, fields){
                            if(error){
                                console.log(error);
                            }
                            else {
                                res.render('user/deletenames',{title: 'Delete Names', crud: true, names: results});
                                connection.release();
                                if(error) throw error;
                            }
                        });
                    }
                });  
            }

     
    }
}
