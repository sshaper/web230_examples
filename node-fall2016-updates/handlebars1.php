<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Handlebars 1');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Handlebars 1");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Template Engine</h2>
		    <p>In most modern web applications templates are used for the web pages.  Templates allow one to re-use parts of a page without having to re-write it.  Usually there is a master template in which the content is injected.  There are many templating engines for node.  In this course we are going to use "handelbars".</p>

		    <h2>Handlebars</h2>
		    <p>Handlebars is a easy to implement backend templating engine for node.  It can easily be installed by entering the following command in the console.</p>

<pre><code class="javascript">npm install express-handlebars --save</code>
</pre>

		<p>Before you can start using handlebars you must create the proper file and folder structure.  Make a copy of the cp-build1.0 folder and name it cp-build2.0.  Add the following folders and files.</p>

<pre><code class="javascript">views
--layouts
----main.handlebars
--partials
---partialfile.handlebars
--home.handlebars</code></pre>
		<ul>
			<li><strong>Layouts</strong> - The layouts folder contains the main layout template.  Usually this is just one page but it can be more than on page, as I will demonstrate later</li>
			<li><strong>main.handlebars</strong> - The main.handlebars file is the main layout template.  We can call it anything we want but we would have to change it in the server code. NOTE: All handlebar files have the extension of "handlebars".  We can change this as well in the server code</li>
			<li><strong>partials</strong> - This is where we store our partial files.  Partial files are sub files we can inject into the main layout or a body part.  Partial files are optional as you may not need them.  In this example, I will inject the partial into the home.handlbars page.</li>
		</ul>

		<h2>Package.json update</h2>
		<p>You will also need to update your package.json file by adding the express-handlebars module.</p>

<pre><code class="javascript">{
  "name": "classproject",
  "version": "2.0",
  "description": "Class Project",
  "author": "Scott Shaper",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.3",
    "express-handlebars": "^2.0.1"
   }
}
</code></pre>


		<p>The main.handlebars page has a placeholder for the content named "body" as show below.  NOTE: The placeholder text must have the name of "body".  Also notice I have the <code>{{title}}</code> as content for the title element.</p>
<pre><code class="html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="utf-8"&gt;
&lt;meta http-equiv="x-ua-compatible" content="ie=edge"&gt;
&lt;title&gt;{{title}}&lt;/title&gt;
    
&lt;!--below is a script which allows IE 8 to understand HTML 5 elements.--&gt;
&lt;!--[if lt IE 9]&gt;
    &lt;script&gt;
        var elementsArray = ['abbr', 'article', 'aside', 'audio', 'bdi', 'canvas', 'data', 'datalist', 'details', 'figcaption', 'figure', 'footer', 'header', 'main', 'mark', 'meter', 'nav', 'output', 'progress', 'section', 'summary', 'template', 'time', 'video'];
        var len = elementsArray.length;
        for(i = 0; i &lt; len; i++){
            document.createElement(elementsArray[i]);
        }
    &lt;/script&gt;
&lt;![endif]--&gt;


&lt;/head&gt;
&lt;body&gt;
	{{{body}}}
&lt;/body&gt;
&lt;/html&gt;</code></pre>

		<p>The three <code>{{{}}}</code> allow it to parse html <code>{{}}</code> will process just text</p>
		<p>The home.handlebars page, which will be inserted where the body is, is shown below</p>

<pre><code class="html">&lt;main&gt;
	&lt;p&gt;Hello! I am a web page&lt;/p&gt;
	{{&gt; partialfile this}}
&lt;/main&gt;</code></pre>

		<p>In the above code I am adding a partial file (partialfile.handlebars) this file is shown below. NOTE: The file name can be anything I want, I just named it partialfile to be descriptive.</p>

<pre><code class="html">&lt;p&gt;This is a partial file&lt;/p&gt;</code>
</pre>

		<p>To set up the server for using handlebars you must add use the following code.</p>

		<h3>index.js</h3>
		<p>In the index.js file you need to add the following line.  This allows us to serve up file from the view directory.</p>
<pre><code class="javascript">/* MAKE THE VIEWS DIRECTORY SO WE CAN SERVE UP THE FILES WITHIN THAT DIRECTORY */
app.set('views', __dirname + '/views');
</code></pre>

		<h3>server/config.js</h3>
		<p>You need to add the following to the dependencies</p>
<pre><code class="javascript">exphbs = require('express-handlebars'),</code></pre>

		<p>Then you need to add the following code to tell the server to use the handlebars engine.</p>

<pre><code class="javascript">/* SET UP HANDLEBARS AS YOUR TEMPLATE ENGINE */
app.engine('handlebars', exphbs.create({
	defaultLayout: 'main',
	layoutsDir: app.get('views') + '/layouts',
	partialDir: app.get('views') + '/partials',
}).engine);
app.set('view engine','handlebars');</code></pre>

		<p>Full server/config.js code</p>
<pre><code class="javascript">/* PULL IN THE DEPENDENCIES */
var routes = require('./routes'),
	exphbs = require('express-handlebars'),
	express = require('express')

module.exports = function(app){
	/* PUT APP INTO ROUTES CONSTRUCTOR */
	routes(app);

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

	<h3>controllers/home.js</h3>
	<p>The home.js file needs to render a webpage now instead of just text.  For that we will use the <code>res.render</code> method.</p>

	<p>The res.render takes up to three parameters <code>res.render(view, [locals], [callback])</code></p>
	<ul>
		<li>View - The view argument is a string that is the file path of the view file to render. This can be an absolute path, or a path relative to the views setting.</li>
		<li>Locals - an object whose properties define local variables for the view (optional).</li>
		<li>Callback -  a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes next(err) internally (optional).</li>
	</ul>

	<p>In our code we are calling the home.handlerbars page as our view and setting the content for the title element.</p>
<pre><code class="javascript">module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
     index: function(req, res){
          res.render('home',{title: 'Home Page'});
 	}
}</code></pre>

		<p>To test the code go into the cp-build2.0 folder and enter <code>node index.js</code>. In the browser go to your ip address port 3000. For me it is 45.55.242.213:3000</p>
		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>