module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
	getNames: function(req, res){
        res.render('user/names',{title: 'Names Page',heading: 'Names Page', names: namesList, nav: true});
 	}
}

/* I CREATED A SEPERATE VARIABLE THAT STORES THE NAMES ARRAY OUTSIDE OF THE MODULE EXPORTS. I ATTEMPTED IT INSIDE OF MODULE EXPORTS BUT COULD NOT GET IT TO DISPLAY THE NAMES.  I HAVE FOUND THAT SOMETIMES YOU HAVE TO PUT SEPARATE OPERATIONS OUTSIDE OF MODULE EXPORTS TO MAKE IT WORK PROPERLY.  IN LATER LESSONS I WILL SHOW YOU HOW TO ACCESS THIS DATA FROM A DATABASE.*/
var namesList = [
	  {
	    "name": "Karin Grimes"
	  },
	  {
	    "name": "Rochelle Herrera"
	  },
	  {
	    "name": "Claire Hendricks"
	  },
	  {
	    "name": "Bobbi Livingston"
	  },
	  {
	    "name": "Buchanan Holder"
	  },
	  {
	    "name": "Dina Craig"
	  },
	  {
	    "name": "Murray Mccoy"
	  },
	  {
	    "name": "Christine Shaw"
	  },
	  {
	    "name": "Lucinda Sanders"
	  },
	  {
	    "name": "Gayle Lott"
	  }
]