module.exports = {
      index: function(req, res){
        /*CHECKS TO SEE IF THE SUCCESS PROPERTY IS IN THE SESSION OBJECT.  IF SO MOVE ON, IF NOT DON'T*/
        if(req.session.success){
        	res.render('admin/home',{title: 'Admin Home Page',heading: 'Admin Home Page', admin: true});     
        }
        /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
        else{
            /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
            res.redirect('/user/login/?error=1');
       	}
    }
}