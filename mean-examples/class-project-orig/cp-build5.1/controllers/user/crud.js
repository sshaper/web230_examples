/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var nameModel = require('../../models').Names;

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    shownames: function(req, res){
        nameModel.find({},{fname: 1, lname: 1, email: 1},function(err, namesList){
            if(err){
                console.log(err);
            }
            else {
                res.render('user/shownames',{title: 'Show Names', crud: true, names: namesList});
                //res.render('update_account_form',{title: 'Update Account', nav: true, accounts: accountData});
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
    	
    	/* NEED TO PUT DATA INTO A NAMEMODEL OBJECT AND THEN SAVE IT */
    	var name = new nameModel(data);
        name.save(function(err){
        	if(err){
        		console.log(err);
        	}
        	else{
        		res.render('user/addname', {title: 'Add Names', crud: true, msg: 'Name Added'});
        	}
        });
    },
    updatenameslist: function(req, res){
        nameModel.find({},{_id: 1, fname: 1, lname: 1, email: 1},function(err, namesList){
            if(err){
                console.log(err);
            }
            else {
                res.render('user/updatenames',{title: 'Update Names', crud: true, names: namesList});
            }
        });
    },
    updatenames: function(req, res){
        //console.log(req.body);
        var data = JSON.stringify(req.body);
        data = JSON.parse(data);
        var len = data.fname.length; /* I ONLY NEED ONE LENGTH AS IT WILL BE THE LENGTH OF THEM ALL. */
        var i = 0;
        
        submitData();

        function submitData(){
            nameModel.findOneAndUpdate({ _id: data.hiddenId[i]}, {$set: {fname: data.fname[i], lname: data.lname[i], email: data.email[i]}}, {updated: true}, function(err, doc) {
                /* THIS GOES IN THE CALL BACK SO WHEN THE LAST UPDATE IS DONE THE NEXT ONE CAN HAPPEN */
                i++;
                if (i < len){
                    submitData();
                }
                else{
                    /* GRAB A NEW LIST AND DISPLAY IT */
                    nameModel.find({},{_id: 1, fname: 1, lname: 1, email: 1},function(err, namesList){
                        if(err){
                            console.log(err);
                        }
                        else {
                            res.render('user/updatenames',{title: 'Update Names', crud: true, names: namesList});
                        }
                    });  
                }
            });
        }
    },
    deletenameslist: function(req, res){
        nameModel.find({},{_id: 1, fname: 1, lname: 1, email: 1},function(err, namesList){
            if(err){
                console.log(err);
            }
            else {
                res.render('user/deletenames',{title: 'Delete Names', crud: true, names: namesList});
            }
        });
    },
    deletenames: function(req, res){
        //console.log(req.body.deleteId);
        var data = JSON.stringify(req.body.deleteId);
        data = JSON.parse(data);
        var i = 0;
        var len = 0;
        if(typeof data == 'object'){
            len = data.length;
            deleteRecords();
            function deleteRecords(){
                nameModel.findByIdAndRemove(data[i], function(err){
                    i++;
                    if(i < len){
                        deleteRecords();
                    }
                    else {
                        nameModel.find({},{_id: 1, fname: 1, lname: 1, email: 1},function(err, namesList){
                            res.render('user/deletenames',{title: 'Delete Names', crud: true, names: namesList});
                        });    
                    }
                });
            }
            //console.log('it is an array');
        }
        else{
            //just delete using id
             nameModel.findByIdAndRemove(data, function(err){
                    if(err){
                        console.log(err);
                    }
                    else {
                        nameModel.find({},{_id: 1, fname: 1, lname: 1, email: 1},function(err, namesList){
                            res.render('user/deletenames',{title: 'Delete Names', crud: true, names: namesList});
                        });
                    }
            });
        }
    }
}
