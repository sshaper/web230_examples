<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Sessions and Body Parser');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Sessions and Body Parser");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Structure Changes</h2>
		    <p>In this lesson we are going to create an admin area separate from a user area.  To do this we need to change our folder file structure.  Make a copy of the cp-build3.0 and rename it to cp-build4.0 and do the following updates. The updated folder file structure is as follows.</p>

<pre><code class="javascript">controllers
--admin
--user
----home.js
----names.js
public
--css
---main.css
views
--layouts
----main.handlebars
--partials
---partialfile.handlebars
---navigation.handlebars
--user
----home.handlebars
----names.handlebars
--admin
server
--configure.js
--routes.js
package.json
index.js</code></pre>

		<p>We did the following</p>
		<ul>
			<li>created an admin folder in the controllers folder</li>
			<li>create a user folder in the controllers folder and put the home.js and names.js files in them.</li>
			<li>create an admin folder in the views folder</li>
			<li>create a user folder in the views folder and put the home.handlebars and names.handlebars files in them.</li>
		</ul>

		<h2>Update Package.json file</h2>
		<p>We have to bring in some more modules so we need to update our package.json file and install those modules.  The following is the updated file.</p>
<pre><code class="javascript">{
  "name": "classproject",
  "version": "4.0",
  "description": "Class Project",
  "author": "Scott Shaper",
  "license": "ISC",
  "dependencies": {
  	"body-parser": "^1.14.1",
    "express": "^4.13.3",
    "express-handlebars": "^2.0.1",
    "express-session": "^1.12.1"
   }
}
</code></pre>

		<p>The modules we added are</p>
		<ul>
			<li><strong>body-parser</strong> - Allows us to pass form data to the server from the browser</li>
			<li><strong>express-session</strong> - Allows us to create a session (explained later)</li>
		</ul>

		<h2>Updating the Server/configure.js file</h2>
		<p>In order to use the modules we added we had to add them to our <code>server/configure.js</code> file.  The code is shown below.</p>

<pre><code class="javascript">/* PULL IN THE DEPENDENCIES */
var routes = require('./routes'),
	exphbs = require('express-handlebars'),
	express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	session = require('express-session');

module.exports = function(app){
	/*SET UP BODYPARSER	*/
	app.use(bodyParser.urlencoded({'extended':false}));
		
	/*SET UP THE SESSION*/
	app.use(session({
	  secret: 'thisisasecret',
	  resave: false,
	  saveUninitialized: false
	}));
	
	/* PUT APP INTO ROUTES CONSTRUCTOR */
	routes(app);

	/* MAKE THE PUBLIC FOLDER STATIC SO WE CAN GET AND USE OUR JS, CSS, ETC FILES */
	app.use('/public/', express.static(path.join(__dirname,'../public')));

	/* SET UP HANDLEBARS AS YOUR TEMPLATE ENGINE */
	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialDir: app.get('views') + '/partials',
	}).engine);
	app.set('view engine','handlebars');

	/* RETURN APP */
	return app;
};</code></pre>

		<h2>BodyParser module</h2>
		<p>The body parser allows you to parse data sent from the client computer to your server.  This is handy for form submission amongst other things.  The following code is the minimum needed to set up body parser without having any errors.</p>

<pre><code class="javascript">app.use(bodyParser.urlencoded({'extended':false}));</code></pre>

		<p><code>bodyParser.urendcoded</code> method Returns middleware that only parses urlencoded bodies (form data). This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.</p>

		<p>A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).</p>

		<p>There is more to the bodyParser that we will look at later.  For more information please refer to <a href="https://www.npmjs.com/package/body-parser">https://www.npmjs.com/package/body-parser</a></p>

		<h2>What is a Session</h2>
		<p>Because HTTP is stateless, in order to associate a request to any other request, you need a way to store user data between HTTP requests.</p>

		<p>Cookies or URL parameters ( for ex. like http://example.com/myPage?asd=lol&amp;boo=no ) are both suitable ways to transport data between 2 or more request. However they are not good in case you don't want that data to be readable/editable on client side.</p>

		<p>The solution is to store that data server side, give it an "id", and let the client only know (and pass back at every http request) that id. The way the session works in there is an id stored on the client side in a cookie.  When a web pages is being called the client sends over the cookie information.  If the server has a file (session) that maps to that cookie then the session information can be accessed.</p>

		<p>To create a session the file and id are created on the server and when the page is returned the cookie is created.</p>



		<h2>Express Session</h2>
		<p>The <a href="https://www.npmjs.com/package/express-session">express-session</a> module allows you to create, regenerate, and save sessions.  In this tutorial we will be using sessions to allow limited access the admin area.  The code below is the minimum we need to get started with sessions.</p>

<pre><code class="javascript">app.use(session({
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: false
}));</code></pre>

		<p>The properties used are described as follows.</p>
		<ul>
			<li><strong>secret</strong> - The secret is a random, high-entropy string you create to encrypt the cookie. We need to take this step because the browser is an inherently untrusted environment; anyone with access can open it up and see what’s stored in there. Client-sessions will encrypt and decrypt all the cookie values, so you don’t have to worry about prying eyes. This can be either a string for a single secret, or an array of multiple secrets. If an array of secrets is provided, only the first element will be used to sign the session ID cookie, while all the elements will be considered when verifying the signature in requests.</li>
			<li><strong>resave</strong> - Forces the session to be saved back to the session store, even if the session was never modified during the request. Depending on your store this may be necessary, but it can also create race conditions where a client makes two parallel requests to your server and changes made to the session in one request may get overwritten when the other request ends, even if it made no changes (this behavior also depends on what store you're using).  The default value is true, but using the default has been deprecated, as the default will change in the future. Please research into this setting and choose what is appropriate to your use-case. Typically, you'll want false.  How do I know if this is necessary for my store? The best way to know is to check with your store if it implements the touch method. If it does, then you can safely set resave: false. If it does not implement the touch method and your store sets an expiration date on stored sessions, then you likely need resave: true.</li>
			<li><strong>saveUnintialized</strong> - orces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session. The default value is true, but using the default has been deprecated, as the default will change in the future. Please research into this setting and choose what is appropriate to your use-case.</li>
		</ul>
		
		<h2>Building the Admin Page</h2>
		<p>First we will build our admin page then the login page that allows us access.  The admin html <code>views/admin/home.handlebars</code> is fairly straight forward</p>

<pre><code class="html">&lt;main&gt;
	&lt;p&gt;Hello! This is the admin area&lt;/p&gt;
&lt;/main&gt;</code></pre>

		<p>The <code>controllers/admin/home.js</code> page is a little more complicated but not that bad.</p>

<pre><code class="javascript">module.exports = {
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
}</code></pre>

		<p>What I am doing is checking for a successful session first if the session is successful then I render the admin page (user has access to the admin page).</p>
		<p>I check for the session but checking to see if <code>session.success</code> is true.  Later in this lesson you will see where I set the session and add the "success" part.  Success is what I made up and is a property of the session object.</p>
		 <p>If the session doesn not exist I redirect the user back to the login page but pass an <code>error=1</code> parameter to the URL.  If the user attempted to access the admin page by manually entering the URL they would be redirected back to the login page with an error message.</p>
		<p>When we look at the login page we will see how this all ties together.</p>

		<h2>Updating the Routes</h2>
		<p>Before we can look at the login related files we need to update our routes.  The code is shown below.</p>

<pre><code class="javascript">/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	names = require('../controllers/user/names');
	login = require('../controllers/user/login')
	admin = require('../controllers/admin/home');

module.exports = function(app){
	/* USER ROUTES */
	router.get('/user/', home.index);
	router.get('/user/diff', home.diff);
	router.get('/user/names', names.getNames);
	router.get('/user/login', login.index);
	router.post('/user/login', login.access);

	/* ADMIN ROUTES */
	router.get('/admin/', admin.index);
	router.get('/admin/logout/', login.logout);

	app.use(router);
}</code></pre>

		<p>Notice that I have two routes that both go to <code>/user/login</code>.  The first route (<code>router.get</code>) just gets the login page.  The second route (<code>router.post</code>) is called automatically when the user needs to send data to the sever. In our case they fill out the password box and click the submit button.  I also include the <code>controllers/user/login</code> file.</p>

		<h2>Building the Login Page</h2>
		<p>The HTML for the login page (<code>views/user/login.handlebars</code>) is basically a form with a placeholder (<code>{{error}}</code>) for error messages.</p>

<pre><code class="html">&lt;h2&gt;Login To Admin Area&lt;/h2&gt;
&lt;p&gt;Enter password and click submit&lt;/p&gt;
&lt;p class="error"&gt;{{error}}&lt;/p&gt;
&lt;form action="/user/login/" method="post"&gt;
  &lt;div class="form-group"&gt;
    &lt;label for="password"&gt;Password&lt;/label&gt;
    &lt;input type="password" class="form-control" id="password" name="password" placeholder="Password"&gt;
    &lt;button type="submit" class="btn btn-default"&gt;Submit&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

		<p>The login.js page (<code>controllers/user/login.js</code>) is where all the session creation and destruction happens.  The code is shown below.</p>

<pre><code class="javascript">module.exports = {
	/*LOGIN PAGE FIRST LOAD*/
     index: function(req, res){
          var url = require('url');
          var url_parts = url.parse(req.url, true);
          var query = url_parts.query;
          
          /*IF THE PERSON IS ALREADY LOGGED IN AND THEY GOT TO THIS PAGE
          THEY ARE REDIRECTED BACK TO THE ADMIN HOME PAGE.*/
          if(req.session.success){
             res.redirect('../../admin/');
           }
           /*IF THERE IS AN ERROR PARAMETER PASSED WITH THE VALUE OF 1 THEN DISPLAY AN ERROR MESSAGE AND SHOW THE LOGIN PAGE.*/
           else if (query.error == 1){
              error = "You do not have access to the admin area";
              res.render('user/login',{error: error, title: 'Login Page', heading: 'Login Page'})
           }
           else{
             /*JUST THE DEFAULT LOGIN PAGE NO ERRORS.  THIS WILL BE CALLED WHEN
             THEY FIRST ACCESS THE LOGIN PAGE. THE ERROR IS SET TO AN EMPTY STRING TO CLEAR OUT ANY PAST ERROR MESSAGE.*/
             error = '';
             res.render('user/login',{error: error, title: 'Login', heading: 'Login Page', nav: true});
          }
     },

     /*THIS IS CALLED THEN THEY CLICK THE "ACCESS ADMIN AREA BUTTON"*/
     access: function(req, res){
          /*PASSWORD IS HARDCODED IN AND NOT ENCRYPTED THIS IS JUST FOR THIS EXAMPLE
          NORMALLY THIS WOULD BE STORED IN THE DATABASE AND ENCRYPTED WE WILL LOOK AT THIS LATER */
          if(req.body.password === 'password'){
               req.session.regenerate(function(err){
                    if(err){
                         console.log(err)
                    }
                    /*IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY AND REDIRECT TO ADMIN HOME PAGE*/
                    else{
                         req.session.success = 'access approved';
                         res.redirect('../../admin/');
                    }
 
               });
          }
          /* IF INCORRECT PASSOWORD WAS GIVEN RENDER LOGIN PAGE WITH ERROR MESSAGE*/
          else{
              res.render('user/login',{error: 'Incorrect Password'});
          }
     },

     /*THIS IS THE LOGOUT PAGE WHERE THE SESSION IS DESTROYED*/
     logout: function(req, res){
          req.session.destroy(function(err){
               if(err){
                    console.log(err);
               }
               else{
                    
                    res.redirect('/user/');
               }
          });
     }
}</code></pre>

		<h3>index function</h3>
		<p>The index function is called when someone accesses the login page as a get.  If first checks if there was an parameter added to the named "error" and if so stores the value "1".</p>
		<p>It then checks (first if statement) if there is a valid session, if so they are redirected to the admin page. This is done so if a user that is already logged in happens to go to the login page they will automatically be redirected.</p>
		<p>The "else if" statement checks if there was an error parameter passed and if so returns the user to the login page and displays the error</p>
		<p>The "else" statement just displays the login page, because the user is accessing it for the first time.</p>

		<h3>access function</h3>
		<p>The access function checks to see if the password is correct.  If so it creates a session (<code>session.regenerate()</code>) and sends the user to the admin page (they now have access).  Otherwise it sends the user back to the login page and displays the error message.</p>

		<p>When the session is created using the <code>session.regenerate()</code> method, I add a property name of "success" with a value of "access approved".  I could name my property anything I want and assign more properties to my session.</p>
		<p>I could also add an object to the property that could hold multiple values, which would be handy for a shopping cart application.  For example, I could write <code>req.session.cart = [{product: product1, price: 9.95, prodId: 123},{product: product2, price: 3.50, prodId: 345}]</code>. Accessing the cart items would be just looping through the array of objects.</p>

		<h3>logout function</h3>
		<p>The logout function terminates the session and redirects the user back to the <code>user/</code> page.</p>
		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>