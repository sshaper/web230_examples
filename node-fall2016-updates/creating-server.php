<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Creating a Server');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Creating a Server");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Setting up the Folders and Files</h2>
		    <p>Before we can create our server we need to create our starting files and folders.  Witin your class-project folder create another folder named "cp-build1.0".  This will be our first build.  It will contain the following file folder structure.</p>
<pre><code class="javascript">controllers
--home.js
server
--configure.js
--routes.js
package.json
index.js</code>
</pre>
		<h2>Index.js File</h2>
		<p>The index.js file is the file that starts everything else off.  When we actually fire the server up we will enter <code>node index.js</code>.  The following code goes into the index.js file.</p>
<pre><code class="javascript">/* SET UP YOUR MAIN VARIABLES */
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
	console.log('Server up : http://45.55.242.213:' + app.get('port'));
});
	
</code></pre>

		<h2>Package.json file</h2>
		<p>The next file will be the package.json file. All npm packages contain a file, usually in the project root, called package.json - this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies. It can also contain other metadata such as a project description, the version of the project in a particular distribution, license information, even configuration data - all of which can be vital to both npm and to the end users of the package. The package.json file is normally located at the root directory of a Node.js project.</p>

		<p>You can create the file manually or enter "npm init" and it will prompt you for a series of questions and then create the file base upon your response. You don't have to answer all the questions.</p>

		<p>Below is the staring code for our package.json file.</p>

		<p>NOTE: The name value cannot have spaces.</p>

<pre><code class="javascript">{
  "name": "classproject",
  "version": "1.0",
  "description": "Class Project",
  "author": "Scott Shaper",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.3"
   }
}
	
</code></pre>

		<p>NOTE: To install your modules enter <code>npm install modulename</code> </p>

		<h2>Server/configure.js File</h2>
		<p>This file allows us to set up the configuration for our server.  It is better to put the configurations in the file instead of the index.js file, because it keeps the different parts separated.</p>

		<p>You will notice that this file is required from the index.js file and put into a variable named "config".  Config is then put into app by using the config(app) method.  What is happening is the module.export method from the configure.js file is including the configuration information (which at this point is just the routes).</p>

<pre><code class="javascript">/* PULL IN THE DEPENDENCIES */
var routes = require('./routes'),
	express = require('express')

module.exports = function(app){
	/* PUT APP INTO ROUTES CONSTRUCTOR */
	routes(app);

	/* RETURN APP */
	return app;
};</code></pre>

		<p>A module.exports function (as shown above) encapsulates related code into a single unit of code. When creating a module, this can be interpreted as moving all related functions into a file. In the above example we put the routes into the module.exports function, which allows use to us that object later.  We will be using module.exports a lot in this project.</p>

		<h2>Server/routes.js file</h2>
		<p>The routes file is where we store our routes.  Routes are the paths to the various pages. You will see from the code example that the <code>router.get('/', home.index);</code> function will call the <code>index</code> function of the <code>home.js</code> page when the forward slash only "/" is put into the url after the ip address and port <code>45.55.242.213:3000/</code>.</p>



<pre><code class="javascript">/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/home');

module.exports = function(app){
	/* HOME */
	router.get('/', home.index);
	app.use(router);
}</code></pre>

		<h2>Controllers/home.js</h2>
		<p>The controllers folder contains the individual files that are called with the specific route.  For example, this file will be called when <code>45.55.242.213:3000/</code> is entered in the URL.  In this case all it does is return the text "Congratulations! It Works!".  For this project I have a different controller file for each page, but you could do it for different sections of the application as well.  Basically, in our example, the controller will be what serves up the content.  The code is shown below.</p>

<pre><code class="javascript">module.exports = {
	//This provides the content for the index page
     index: function(req, res){
          res.send('Congratulations! It works!')
 	}
}</code></pre>

		<h2>Request and Response</h2>
		<p>The <code>req, res</code> parameters in the index function are the request and response objects.  The request object contains data sent to the server from the browser such as URL, headers, query strings, etc.  The response object contain data sent from the server back to the browser.  In the example above all I sent back was text, so the browser displayed it as text.  We will look further into the request and response objects as we continue through this course.</p>

		<h2>Starting the Server</h2>
		<p>Now that we have created all our supporting files we can start the server by going onto our cp-build1.0 folder and entering <code>node index.js</code>. In our URL we can enter <code>45.55.242.213:3000/</code> and our "Congratulations! It Works!" message should appear.</p>


		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>