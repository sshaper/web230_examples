module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
          res.render('user/home',{title: 'Home Page',heading: 'Home Page', nav: true});
 	},
 	diff: function(req, res){
          res.render('user/home',{title: 'Home Page',heading: 'Home Page', diff: true});
 	}
}
