<?php
//include file
include_once '../../classes/Pagelayout.php';
//initiate class
$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Mongoose');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Mongoose");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Mongoose</h2>
		    <p>Mongoose is a robust Node.js object data modeling (ODM) module that adds MongoDB support to your Express application.  Mongoose uses schemas to model your entities, offers predefined validation along with custom validations, allows you to define virtual attributes, and uses middleware hooks to intercept operations. The Mongoose design goal is to bridge the gap between the MongoDB schemaless approach and the requirements of real-world applications.</p>

		    <h2>Mongoose Schema</h2>
		    <p>When you use Mongoose, you need to implement schemas.  A schema defines the fields and field types for documents in a collection. This can be very useful if your data is structured to support a schema because you can validate and typecast objects to match the requirements of the schema.</p>

		    <p>For each field in a schema you need to define a specific value type.  The following value types are supported.</p>
		    <ul>
		    	<li>String</li>
		    	<li>Number</li>
		    	<li>Boolean or bool</li>
		    	<li>Array</li>
		    	<li>Buffer</li>
		    	<li>Date</li>
		    	<li>ObjectId or Oid</li>
		    	<li>Mixed</li>
		    </ul>

		    <p>A schema needs to be defined for each different document type that you plan to use. Also, you should store only one document type in each collection. </p>  

		    <p>You will see examples of a schema in the example provided later in this lesson.</p>

		    <!-- <h2>Mongoose model</h2>
		    <p>Once you have defined the schema object for a model, you need to compile it into a Model object. When Mongoose compiles the model it uses the connection to the MongoDB database established by mongoose.connect() to ensure that the collection is created and has the appropriate indexes, as well as required and unique settings, when applying changes.</p>

		    <p>The compiled Model object acts in much the same way as the Collection object.  It provided the functionality to access, update, and remove objects in the model and subsequently in the MongoDB collection.</p>

		    <p>To compile the model you use the model() method in the mongoose model. The model method has the following syntax</p>

<pre><code class="javascript">model(name, [schema], [collection], [skipInit])</code>
</pre>

			<p> The name parameter is a string you can use to find the model later, using model(name). The schema parameter is the Schema object discussed in the previous section. The collection parameter is the name of the collection to connect to if one was not specified in the Schema object.  The skipInit option is a boolean that defaults to false. When it is true, the initialization processes is skipped, and a simple Model object with no connection to the database is created.</p> -->

			<p>You will see an example of creating and using a model later in this lesson.</p>

			
			 <h2>Installing Mongoose</h2>
<pre><code class="javascript">npm install mongoose</code>
</pre>
			<h2>Connecting to Mongoose</h2>
			<p>If you are connecting with no authorization permissions (not recommended) then you can do the following</p>
<pre><code class="javascript">mongoose.connect('mongodb://127.0.0.1/classProject');
mongoose.connection.on('open',function(){
	console.log('Mongoose Connected.')
});</code></pre>

			<p>The mongoose.connection.on() is a listener that fires when mongoose gets connected, then is prints the "Mongoose Connected" message to the console.</p>

			<p>If you are connecting with authorization you can do the following</p>

<pre><code class="javascript">var options = {
   user: 'username',
   pass: 'password',
   auth: {
       authdb: 'admin'
   }
};
mongoose.connect('mongodb://127.0.0.1/classProject',options);
mongoose.connection.on('open',function(){
	console.log('Mongoose Connected.')
});</code></pre>

		<p>In the above code I created an option object that contains the username, password and authorization database (the database where the administrator was created in, in this case it was admin.</p>

		<p>I add that object as a parameter to the mongoose.connect function.</p>

		<h2>Creating the Class Project Database</h2>
		<p>Before we work with mongoose we need to create our database.  We can use mongoose to do this, but for this lesson we are going to get started using the mongo shell then later we will do updates with mongoose.</p>

		<p>The code below creates our database named classProject</p>
<pre><code class="javascript">use classProject</code></pre>

		<p>We will create the collection named "content" within our database.</p>
		<p>NOTE: You must be in the 'classProject' database</p>

<pre><code class="javascript">db.createCollection("content")</code></pre>

		<p>We will then create two documents.  I typed each line then pressed "enter"</p>
<pre><code class="javascript">db.content.insert({'name':'home','text':'This is the home page'})
db.content.insert({'name':'about','text':'This is the about page'})
</code></pre>

		<p>The content I entered here will be the content for the user page and user/about page (yet to be created).  It will also be the content for the admin/ page and admin/about page.</p>

		<p>Eventually what will happen is the admin page will be used to update content while the user pages will just display it.  Right now all we want to do is get the database content to display on the pages.</p>

		<h2>Adding Mongoose to our Class Project</h2>
		<p>We are going to add mongoose to our class project.  You want to copy cp-build4.0 and rename the copy to cp-build5.0.  You also want to install mongoose.  Below is the updated package.json file</p>

<pre><code class="javascript">{
  "name": "classproject",
  "version": "5.0",
  "description": "Class Project",
  "author": "Scott Shaper",
  "license": "ISC",
  "dependencies": {
  	"body-parser": "^1.14.1",
    "express": "^4.13.3",
    "express-handlebars": "^2.0.1",
    "express-session": "^1.12.1",
    "mongoose": "^4.3.0"
   }
}
</code></pre>


		<h2>Changes to the Main Index.js file</h2>
		<p>We have to set mongoose up in our main index.js file.  The update is shown below</p>
		<p>NOTE: As of 10/4/2016 I discovered a warning that appears reference promises.  It is resolved by adding the line <code>mongoose.Promise = global.Promise;</code></p>

<pre><code class="javascript">/* SET UP YOUR MAIN VARIABLES */
var express = require('express'),
	config = require('./server/configure'),
	app = express(),
	mongoose = require('mongoose');

/* CALL THE MODULE.EXPORTS CONSTRUCTOR FUNCTION OF THE CONFIGURE FILE THIS ADDS TO APP AND RETURNS APP
THIS IS DONE SO WE DO NOT HAVE TO WRITE A BUNCH OF CODE IN OUR INDEX FILE. */
app = config(app);

/*CONNECT TO MONGOOSE*/
mongoose.connect('mongodb://127.0.0.1/classProject');
mongoose.connection.on('open',function(){
	console.log('Mongoose Connected.')
});

/* NEED TO DO THIS TO PREVENT PROMISE ERROR FROM HAPPENING */
mongoose.Promise = global.Promise;

/* SET THE PORT */
app.set('port',process.env.PORT || 3000);

/* MAKE THE VIEWS DIRECTORY SO WE CAN SERVE UP THE FILES WITHIN THAT DIRECTORY */
app.set('views', __dirname + '/views');

/* LISTEN ON PORT 3000 */
app.listen(app.get('port'),function(){
	console.log('Server up : http://45.55.242.213:' + app.get('port'));
});</code></pre>

		<p>Here I am installing mongoose on the localhost <code>127.0.0.1</code> and not on my digital ocean ip of 45.55.242.213.  The reason is the local host way is more secure.  The reason this works is because mongoose is local to my server.</p>

		<h2>Changing the Views and Routes</h2>
		<p>I changed the <code>home.handlebars</code> and the <code>admin.handlebars</code> files in the views to look like the following</p>

<pre><code class="html">&lt;main&gt;
	{{{pageData}}}
&lt;/main&gt;</code></pre>

		<p>I removed the <code>names.handlebars</code>, <code>partialfile.handlebars</code>, <code>name.js</code> files and modfied the the <code>routes.js</code> and <code>navigation.handlebars</code> file.</p>

		<p>The new structure looks like the following.</p>
<pre><code class="javascript">controllers
--admin
--user
----home.js
public
--css
---main.css
views
--layouts
----main.handlebars
--partials
---navigation.handlebars
--user
----home.handlebars
--admin
server
--configure.js
--routes.js
package.json
index.js</code></pre>

	<p>The modified <code>routes.js</code> file is shown below.  Notice I got rid of the diff as well.</p>

<pre><code class="javascript">/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	login = require('../controllers/user/login')
	admin = require('../controllers/admin/home');

module.exports = function(app){
	/* USER ROUTES */
	router.get('/user/', home.index);
	router.get('/user/about', home.about);
	router.get('/user/login', login.index);
	router.post('/user/login', login.access);

	/* ADMIN ROUTES */
	router.get('/admin/', admin.index);
	router.get('/admin/about/', admin.about);
	router.get('/admin/logout/', login.logout);

	app.use(router);
}</code></pre>

	<p>The updated <code>navigation.handlebars</code> file looks like the following.</p>

<pre><code class="html">&lt;nav&gt;
	{{#if nav}}
		&lt;ul&gt;
			&lt;li&gt;&lt;a href="/user/"&gt;Home&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href="/user/about"&gt;About Us&lt;/a&gt;&lt;/li&gt;
		&lt;/ul&gt;
	{{else if admin}}
		&lt;ul&gt;
			&lt;li&gt;&lt;a href="/admin/"&gt;Admin Home&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href="/admin/about"&gt;Admin About&lt;/a&gt;&lt;/li&gt;
			&lt;li&gt;&lt;a href="/admin/logout/"&gt;Logout&lt;/a&gt;&lt;/li&gt;
		&lt;/ul&gt;
	{{/if}}
&lt;/nav&gt;</code></pre>

		<h2>Creating the Mongoose Modules</h2>
		<p>I added a folder to the cp-build5.0 root named <code>modules</code> and within that folder I have two files <code>content.js</code> and <code>index.js</code></p>

		<p>The code for the index.js page is shown below</p>
<pre><code class="javascript">/*THIS INDEX PAGE ALLOWS USE TO LOAD OUR MODELS BY CALLING THIS FILE AND THE MODEL NAME*/
module.exports = {
	'Content':require('./content')
};</code></pre>

		<p>In the above file every time we add a model we can add it to the <code>index.js</code> file.  You will see an example of why this is useful later in this lesson.</p>

		<p>The code for the <code>model/content.js</code> page is shown below</p>

<pre><code class="javascript">var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({
	name: String,
	text: String},
	{collection: 'content'});

module.exports = mongoose.model('Content', contentSchema);</code></pre>

		<p>The first two lines setup the mongoose schema.  The <code>new Schema({...})</code> method takes and object as a parameter.  That object contains the properties and values that make up our schema.  In this case my schema has two properties (name, text) and both their values need to be strings.</p>

		<p>The <code>{collection: 'content'}</code> object tells mongoose what collection to use. If I was to allow mongoose to create the collection then I would not need this line, but because I created the collection in the mongo shell I need to add this line.</p>

		<p>The last line exports the model as a module so it can be used.  The <code>mongoose.model</code> method takes two parameters (name (can be anything you want) and the schema).</p>

		<h2>Changing the Controllers Files</h2>
		<p>Because the data is coming from a database I had to modify the <code>controllers/user/home.js</code> file.  Those modifications are shown below.</p>

<pre><code class="javascript">/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var content = require('../../models').Content;

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
	index: function(req, res){
        /*GET THE PAGE CONTENT FROM THE DATABASE*/
        content.findOne({name: 'home'}, function(err, pageData){
		if(err){
		    console.log(err);
		}
		else{
		    /*RENDER THE HOME PAGE AND PASS IN THE OTHER REQUIRED INFORMATION
		    NOTE: WE CAN REUSE THE HOME.HANDLEBARS PAGE FOR ALL DATA THAT WILL BE SIMULAR BECAUSE THEY ARE ALL THE SAME ONLY THE CONTENT CHANGES AND THE OTHER THINGS THAT ARE BEING SENT.*/
		    res.render('user/home',{pageData: pageData.text, title: 'Home Page', heading: 'Home Page', nav: true});
		}
	});
    },
    about: function(req, res){
        /*GET THE PAGE CONTENT FROM THE DATABASE*/
        content.findOne({name: 'about'}, function(err, pageData){
			if(err){
			    console.log(err);
			}
			else{
			    /*RENDER THE HOME PAGE AND PASS IN THE OTHER REQUIRED INFORMATION
			    NOTE: WE CAN REUSE THE HOME.HANDLEBARS PAGE FOR ALL DATA THAT WILL BE SIMULAR BECAUSE THEY ARE ALL THE SAME ONLY THE CONTENT CHANGES AND THE OTHER THINGS THAT ARE BEING SENT.  IN THIS EXAMPLE I CREATED AN ABOUT PAGE*/
			    res.render('user/home',{pageData: pageData.text, title: 'About Us Page', heading: 'About Us Page', nav: true});
			}
		});
    }

}</code></pre>

		<p>The first line gets the Content model and put it into the content variable.</p>

		<p>The index function first gets the document from the database that contains the name of "home".  If the information is found it returns it via the pageData variable.  Upon successful return I render the home page and add the content from the database and add the variables.</p>

		<p>The about function does the same thing except is gets the document form the database that has the name of "about".</p>

		<p>Notice that both sets of content to the same page <code>user/home</code> that is because all the is changing is the content and the variables we send with the content but the structure of the page stays the same.  So to add a new page similar structure we do the following.</p>

		<ul>
			<li>Add a document to the database</li>
			<li>Add the page to the routes (user and admin)</li>
			<li>Add a function to the <code>controllers/user/home.js</code> file.</li>
			<li>Add a function to the <code>controllers/admin/home.js</code> file.</li>
		</ul>

		<p>Notice on the last bullet point, where we would have to add a function to the <code>controllers/admin/home</code> file.  We would do this because every page in the user side must be replicated in the admin side because the admin updates the pages.  The <code>controllers/admin/home.js</code> file looks like the following.</p>

<pre><code class="javascript">/*THIS BRINGS IN YOUR MODELS FOR YOUR DATA*/
var content = require('../../models').Content;

module.exports = {
    /*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
                /*GET THE PAGE CONTENT FROM THE DATABASE*/
                if(req.session.success){
                    /* EVEN THOUGH WE ARE ON THE ADMIN HOME PAGE WE ARE BRINGING IN THE CONTENT FOR THE HOME PAGE BECAUSE WE WILL BE MODFIYING IT HERE.*/
                    content.findOne({name: 'home'}, function(err, pageData){
                        if(err){
                            console.log(err);
                        }
                        else{
                           res.render('admin/home',{pageData: pageData.text, title: 'Admin Home Page', heading: 'Admin Home Page', admin: true}); 
                        }
                    });
                }
                /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
                else{
                    /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
                    res.redirect('/user/login/?error=1');
                }
        },
    about: function(req, res){
                /*GET THE PAGE CONTENT FROM THE DATABASE*/
                if(req.session.success){
                    /* EVEN THOUGH WE ARE ON THE ADMIN ABOUT PAGE WE ARE BRINGING IN THE CONTENT FOR THE ABOUT PAGE BECAUSE WE WILL BE MODFIYING IT HERE.*/
                    content.findOne({name: 'about'}, function(err, pageData){
                        if(err){
                            console.log(err);
                        }
                        else{
                           res.render('admin/home',{pageData: pageData.text, title: 'Admin About Page', heading: 'Admin About Page', admin: true}); 
                        }
                    });
                }
                /*IF THERE IS NOT SUCCESS PROPERTY THEN SEND THE BACK TO LOGIN PAGE.*/
                else{
                    /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
                    res.redirect('/user/login/?error=1');
                }
        }
}
 </code></pre>

 		<p>The only difference between the two files is the admin file checks for a session first then gets the data and renders the page. If there is not session then it redirects to the login page.</p>

	

		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>