/* SET UP YOUR MAIN VARIABLES */
var express = require('express'),
	config = require('./server/configure'),
	app = express()

/* CALL THE MODULE.EXPORTS CONSTRUCTOR FUNCTION OF THE CONFIGURE FILE THIS ADDS TO APP AND RETURNS APP
THIS IS DONE SO WE DO NOT HAVE TO WRITE A BUNCH OF CODE IN OUR INDEX FILE. */
app = config(app);

/* SET THE PORT */
app.set('port',process.env.PORT || 3000);

/* LISTEN ON PORT 3000 */
app.listen(app.get('port'),function(){
	console.log('cpbuild1.0 server up...');
});