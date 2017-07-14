<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Finishing Up');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Finishing Up");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Introduction</h2>
		    <p>In this lesson we will secure our web application using https and add create a custom 404 error page.</p>

		    <h2>HTTPS</h2>
		    <p>Hyper Text Transfer Protocol Secure (HTTPS) is the secure version of HTTP, the protocol over which data is sent between your browser and the website that you are connected to. The 'S' at the end of HTTPS stands for 'Secure'. It means all communications between your browser and the website are encrypted. HTTPS is often used to protect highly confidential online transactions like online banking and online shopping order forms.</p>

		<p>This is a good <a href="https://www.youtube.com/watch?v=SJJmoDZ3il8">video</a> that describes the https process.</p>

		<h2>Creating a key</h2>
		<p>The code below is what you would enter at the root of your project folder.  This will create a key.pem and cert.pem file.  You will be prompted to answer some questions first.</p>

		<p>NOTE: This creates a sha256 key that is of todays standard for encryption.</p>
<pre><code class="javascript">openssl req -x509 -nodes -sha256 -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem</code>
</pre>
		<p>NOTE: The key creation process above does work but the keys are not certified, so using them will cause the user to get prompts stating this is an untrusted site. For our purposes that is fine, but if you want to you would have to register your key with a <a href="https://en.wikipedia.org/wiki/Certificate_authority">certificate authority</a></p>
		<h2>Adding HTTPS to the Server</h2>
		<p>In our <code>index.js</code> file I modified the code as follows</p>
<pre><code class="javascript">/* THE DEFAULT PORT FOR HTTPS IS 443.  I USED 3443 BECAUSE WE HAD BEEN USING PORT 3000.*/
app.set('port',process.env.PORT || 3443);

/* MAKE THE VIEWS DIRECTORY SO WE CAN SERVE UP THE FILES WITHIN THAT DIRECTORY */
app.set('views', __dirname + '/views');

https.createServer(options, app).listen(app.get('port'),function(){
	console.log('Server up : https://45.55.242.213:' + app.get('port'));</code></pre>
		<p>Basically, all I did was set the port to 3443.  To actually view the page I have to enter <code>https://45.55.242.213:3443/user/</code> into the browser window.</p>

		<p>If you wanted to make your application so that it would be https not matter what the user entered http or https, you could do that using only the defaults.  The following code shows this. (NOTE cp_build10.1 was modified to be https not matter what the user enters.)</p>

<pre><code class="javscript">/* THE DEFAULT PORT FOR HTTPS IS 443.*/
app.set('port',process.env.PORT || 443);
...
/*LISTEN ON PORT 80 */
http.createServer(app).listen(80);</code></pre>

		<p>And the <code>server/routes.js</code> file would be modified as well</p>

<pre><code class="javascript">module.exports = function(app){
	/* USER ROUTES */
	router.use(function(req, res, next){
		if (req.secure) {
			return next();
		};
		res.redirect('https://'+req.hostname+':'+app.get('port')+req.url);
	});
...</code></pre>
		
		<h2>Custom 404 and 500 Pages</h2>
		<p>Currently if the user enters the wrong url node will display a message like "cannot get (page url)".  That is not a professional or user friendly way to do it.  You want the user to be redirected to a custom 404 error page.  In node that is pretty easy to do.  In the views directory I created a 404error.handlebars file (<code>views/404error.handlebars</code>).  The code for the view is displayed below.</p>

<pre><code class="html">&lt;main&gt;
	&lt;h2&gt;Page Not Found&lt;/h2&gt;
	&lt;p&gt;{{text}}&lt;/p&gt;
&lt;/main&gt;</code></pre>

		<p>The <code>{{text}}</code> comes from the error message code, which is located in the <code>server/configure.js</code>file and is shown below.</p>

<pre><code class="javascript">/*HANDLE 404*/
	app.use(function(req, res) {
	res.status(400);
	res.render('404error',{nav: true, subtitle: " - Page Not Found", text: 'We are sorry the page you are looking for is not found on this site.'});
	});

	/*HANDLE 500*/
	app.use(function(error, req, res, next) {
	res.status(500);
	res.render('404error',{nav: true, subtitle: " - Internal Server Error", text: 'Internal Server Error site is down.'});
	});</code></pre>

	<p>Depending on the status of the response the 404error.handlebars file will be loaded with the text variable populated from the res.render function.  This is a global way of creating custom 404 or 500 pages because you are looking at the response status.</p>


		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>