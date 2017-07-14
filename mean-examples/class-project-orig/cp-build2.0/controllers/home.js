module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
     index: function(req, res){
          res.render('home',{title: 'Home Page'});
 	}
}
