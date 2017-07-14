<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Handlebars 2');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Handlebars 2");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Introduction</h2>
		    <p>Now that we understand the basics of how to add handlebars and generate a webpage lets look at how to take advantage of a templating system.  We will start with by copying our cp-build2.0 folder and renaming it to cp-build3.0.</p>

		    <h2>Adding Bootstrap</h2>
		    <p>For this example I will be using bootstrap and I will also be using my own custom stylesheet.  To add the bootstrap it is easiest just to enter the CDN (content delivery network) addresses.  First I will add the CSS to the main.handlebars page</p>
<pre><code class="html">&lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"&gt;</code></pre>

			<p>As you recall the main.handlbars page servers as our template with the content of the page changing, so we link all our stylesheets and JavaScript to the main page.  The supporting JavaScript will be added as well. NOTE: I had to connect using Jquery 2.0 but not version 3 because bootstrap 3 requires no later version than JQuery 2+.  Also I had to get the JQuery CDN from the JQuery site.</p>
			<p>The following scripts go just above the closing body element.</p>

<pre><code class="html">&lt;script   src="https://code.jquery.com/jquery-2.2.4.min.js"   integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="   crossorigin="anonymous"&gt;&lt;/script&gt;
&lt;script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"&gt;&lt;/script&gt;</code></pre>

		<h2>Adding the CSS</h2>
		<p>Bootstrap works great but I have found that I also need to add some of my own styles.  To do that using express we have to add a couple folders and a file.  The first folder we need to create is the <code>public</code> folder which will contain all the assets that are to be viewed by the end user (css, javascript, images, etc).  So inside the public folder we will create a <code>css</code> folder and within that a <code>main.css</code> file.</p>

		<p>The extra folders and files are shown below.</p>

<pre><code class="javascript">controllers
--home.js
public
--css
---main.css
views
--layouts
----main.handlebars
--partials
---partialfile.handlebars
--home.handlebars
server
--configure.js
--routes.js
package.json
index.js</code></pre>

		<p>In order for express to understand it needs to make the public folder accessible we need to add the following line to our <code>server/configure.js</code> file.</p>
		<p>First we need to require the <code>path</code> module which is a part of node.</p>
<pre><code class="javascript">path = require('path')</code></pre>

		<p>Then we need to tell node to make the public folder accessible (this is sometimes called making it static).</p>

<pre><code class="javascript">/* MAKE THE PUBLIC FOLDER STATIC SO WE CAN GET AND USE OUR JS, CSS, ETC FILES */
app.use('/public/', express.static(path.join(__dirname,'../public')));</code></pre>

		<p>The updated configure file is shown here.</p>

<pre><code class="javascript">/* PULL IN THE DEPENDENCIES */
var routes = require('./routes'),
	exphbs = require('express-handlebars'),
	express = require('express'),
	path = require('path')

module.exports = function(app){
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

		<h2>Adding Sections to the Main.handlers page</h2>
		<p>In addition to adding the CSS and JavaScript links we are going to add some elements to the main.handlebars page as shown.  This code is inserted just below the opening body tag.</p>

<pre><code class="html">&lt;div id="wrapper" class="container"&gt;
  &lt;header&gt;
	&lt;h1&gt;Mini-CMS {{heading}}&lt;/h1&gt;
  &lt;/header&gt;
	{{&gt; navigation this}}
	{{{body}}}
&lt;/div&gt;
</code></pre>

		<p>The code above allows us to add a different heading title to every page using the <code>{{heading}}</code>.  We also will use a navigation parcel in the <code>{{&gt; navigation this}}</code>.</p>

		<h2>Creating Another Page</h2>
		<p>Now we are going to create another web page that will display a list of names.  To start we need to create another page.  Remember we don't have to create the whole page just the content.  Under the views folder we will create a page named <code>name.handlebars.</code>  That page will contain the following code.</p>
<pre><code class="html">&lt;main&gt;
	&lt;p&gt;List of names&lt;/p&gt;
	&lt;ul&gt;
	  {{#each names}}
	    &lt;li&gt;{{name}}&lt;/li&gt;
	  {{/each}}
	&lt;/ul&gt;	
&lt;/main&gt;</code></pre>

		<p>What the above code does is iterate through an array of objects, where each object displays the person first and last name.  This is much better than hard coding the list as the names may change later.  In order for this to work we need to create a file in the <code>controllers</code> folder.  We will name the file <code>name.js</code>.  The code for that file is as follows.</p>

<pre><code class="javascript">module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
	getNames: function(req, res){
        res.render('names',{title: 'Names Page',heading: 'Names Page', names: namesList, nav: true});
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
]</code></pre>

		<p>I created a module.exports object that contains the <code>getNames</code> function.  Within that function we have a <code>res.render</code> method that first calls the 'names' page as the view and passes some other parameters as described.</p>
		<ul>
			<li><strong>title</strong> - It is the title of the webpage</li>
			<li><strong>heading</strong> - It is the heading title of the webpage</li>
			<li><strong>names</strong> - It contains the <code>namesList</code> array of name objects.  Handlebars will parse this list (using the code shown in the names.handlebars page and display the list of names.</li>
			<li><strong>nav</strong> - By setting this value to true we will display the main navigation bar we want to be shown for that page (this will be described later).</li>
		</ul>

		<h2>Adding a Route for the New Page</h2>
		<p>In the <code>server/routes.js</code> file we add the route. First we require the name.js page</p>
<pre><code class="javascript">names= require('../controllers/names');</code></pre>

		 <p>Notice I do not need the .js extension it is assumed</p>
		 <p>I then add the actual route</p>

<pre><code class="javascript">router.get('/names', names.getNames);</code></pre>

		<p>Now to access the page I just start the server and enter (for my site) <code>45.55.242.213:3000/names</code> and it will display a list of names as a ul-li list.</p>

		<h2>Creating the Navigation List</h2>
		<p>The above URL <code>45.55.242.213:3000/names</code> works fine but it is not user friendly to expect the user to manually enter a url.  We need to create a navigation list for all our pages.  Again using handlebars this is easy.  For this example, I decided to make it a partial named <code>navigation.handlebars</code> which is located in the views/partials folder.  The code is as follows.</p>

<pre><code class="html">&lt;nav&gt;
  {{#if nav}}
	&lt;ul&gt;
	  &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
	  &lt;li&gt;&lt;a href="/names"&gt;Name List&lt;/a&gt;&lt;/li&gt;
	  &lt;li&gt;&lt;a href="/diff"&gt;Different Nav&lt;/a&gt;&lt;/li&gt;
	  &lt;/ul&gt;
  {{else if diff}}
	&lt;ul&gt;
	  &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
	  &lt;li&gt;&lt;a href="/names"&gt;Name List&lt;/a&gt;&lt;/li&gt;
	  &lt;li&gt;&lt;a href="#"&gt;Blank Nav&lt;/a&gt;&lt;/li&gt;
	  &lt;li&gt;&lt;a href="#"&gt;Blank Nav&lt;/a&gt;&lt;/li&gt;
	  &lt;li&gt;&lt;a href="#"&gt;Blank Nav&lt;/a&gt;&lt;/li&gt;
	&lt;/ul&gt;
  {{/if}}
&lt;/nav&gt;</code></pre>
		<p>What I have done with the above code is set up the ability to load a different navigation bar based upon what page is being accessed.  I am using the handlebars conditional statements to achieve this.  If a page passes the value of <code>nav: true</code> then the first nav is loaded, otherwise if a page passes <code>diff: true</code> then the second nav is loaded.</p>

		<p>The reason we might have two different navs is because we may have an admin area which would have different links then a user area, which may had different navigation links.  Remember all this works off template system so the main template page may be the same.</p>

		<p>I modified the routes page with the code shown below.</p>

<pre><code class="javascript">/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/home');
	names= require('../controllers/names');

module.exports = function(app){
	/* ROUTES */
	router.get('/', home.index);
	router.get('/diff', home.diff);
	router.get('/names', names.getNames);

	app.use(router);
}</code></pre>

	<p>If the page <code>/diff</code> is called then it will call the <code>home.diff</code> function from the <code>home.js</code> page, which is shown below</p>

<pre><code class="javascript">diff: function(req, res){
          res.render('home',{title: 'Home Page', heading: 'Home Page', diff: true});
 	}</code></pre>

 	<p>Basically, the above code load the home page but uses a different navigation bar.  The complete <code>home.js</code> file is shown below</p>


<pre><code class="javascript">module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
          res.render('home', {title: 'Home Page', heading: 'Home Page', nav: true});
 	},
 	diff: function(req, res){
          res.render('home', {title: 'Home Page', heading: 'Home Page', diff: true});
 	}
}</code></pre>	

	<h2>Summary</h2>
	<p>As you can see adding a new page requires us to create the view and a controller page, it also requires us to add those page to the routes file and to the navigation file as well.</p>
	<p>Compared to how you created web pages in the base this may seem like a lot of extra work and confusion, and on a small scale it is.  However, as applications get bigger and more complex the MVC architecture works very well.  You can see that everything has its place, which makes it nice when doing maintenance and updates.</p>

	</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>