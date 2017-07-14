<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - AJAX File Uploads');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("AJAX File Uploads");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Introduction</h2>
		    <p>Up to this point we have only used AJAX to ship text to the server, however, we can upload a file as well using AJAX.</p>
		    <p>For this lesson copy build6.0 and rename to build7.0</p>
		    <h2>Package.json File</h2>
		    <p>We are adding a module named "multer" which will assist us in doing our file uploads.  Belows is the updated package.json file</p>
<pre><code class="javascript">{
  "name": "classproject",
  "version": "7.0",
  "description": "Class Project",
  "author": "Scott Shaper",
  "license": "ISC",
  "dependencies": {
  	"body-parser": "^1.14.1",
    "express": "^4.13.3",
    "express-handlebars": "^2.0.1",
    "express-session": "^1.12.1",
    "mongoose": "^4.3.0",
    "multer":"^1.1.0"
   }
}</code></pre>

		<h2>Multer</h2>
		<p>Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.</p>

<p>NOTE: Multer will not process any form which is not multipart (multipart/form-data).</p>
		<p>Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.</p>

		<h2>Creating the view</h2>
		<p>For this build we are going to create a "adddoc.handlebars" file and place it in our <code>views/admin</code> folder.  The code is shown below.</p>

<pre><code class="html">&lt;main&gt;
	&lt;h2&gt;Add A PDF Document&lt;/h2&gt;
	&lt;form action="/admin/adddoc/" method="post"&gt;
		&lt;div class="row"&gt;
			&lt;div class="col-md-6"&gt;
				&lt;div class="form-group"&gt;
				    &lt;label for="filename"&gt;File Name:&lt;/label&gt;
				    &lt;input type="text" class="form-control" id="filename" name="filename" placeholder="File Name"&gt;
				&lt;/div&gt;
			&lt;/div&gt;
		&lt;/div&gt;

		&lt;div class="row"&gt;
			&lt;div class="col-md-6"&gt;
				&lt;div class="formgroup"&gt;
					&lt;label for="file"&gt;File:&lt;/label&gt;
					&lt;input type="file" class="form-control" name="file" id="file" &gt;
				&lt;/div&gt;
			&lt;/div&gt;
		&lt;/div&gt;

	    &lt;button type="button" class="btn btn-default" id="uploadfile"&gt;Upload File&lt;/button&gt;
	&lt;/div&gt;
	&lt;div id="ack"&gt;&lt;/div&gt;
&lt;/main&gt;</code></pre>

		<p>All the above code does is create a form that allows us to enter a file name and a file to upload.  Notice the button is just a regular button and not a submit button, that is because we will be using AJAX.</p>

		<h2>Creating the Schema</h2>
		<p>We will be storing the filename in a database and the filepath but we will not be storing the file itself, that will be placed on the server.  Normally, files are not stored in a database they are stored in a folder on the server and the path to that file is stored in the database.  In the <code>public</code> folder create a folder named <code>docs</code>, this folder will contain all our uploaded files.</p>

		<p>Our schema is pretty simple, I created file named "document.js" and placed it in the models folder, the code is shown below</p>
<pre><code class="javascript">var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var documentSchema = new Schema({
	fileName: String,
	filePath: String},
	{collection: 'document'});

module.exports = mongoose.model('Document', documentSchema);</code></pre>
		<p>I have to update the <code>index.js</code> file as well.</p>

<pre><code class="javascript">/*THIS INDEX PAGE ALLOWS USE TO LOAD OUR MODELS AS SEEN IN THE CONTROLLER EXAMPLES*/
module.exports = {
	'Content':require('./content'),
	'Document':require('./document')
};</code></pre>


		<h2>Adding Multer to the Routes</h2>
		<p>We could add Multer to the configuration page but it is recommended to only add it to the routes were it is needed.  We will only need it for the adddocs pages so I added that to the routes file.  The code is shown below.</p>
<pre><code class="javascript">/* PULL IN OUR DEPENDENCIES */
var express = require('express'),
	router = express.Router(),
	/* GET CONTROLLER FILES
	NOTE: HERE I CREATED A CONTROLLER FOR EACH PAGE.  THIS IS ONE WAY OF DOING IT. YOU COULD ALSO SET CONTROLLERS FOR THE PAGE AREAS LIKE USER CONTROLLER AND ADMIN CONTROLLER. */
	home = require('../controllers/user/home');
	login = require('../controllers/user/login');
	admin = require('../controllers/admin/home');
	adddoc = require('../controllers/admin/adddoc');
	multer = require('multer');

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
	router.get('/admin/adddoc/', adddoc.index);
	
	router.post('/admin/', admin.postindex);
	router.post('/admin/about/', admin.postabout);
	/* ADDED MULTER TO THE FOLLOWING POST BECAUSE IT WILL BE DOING THE FILE UPLOADS*/
	router.post('/admin/adddoc/',multer({dest:'./public/docs'}).single('file'),adddoc.addDoc);

	app.use(router);
}
</code></pre>

		<p>The "dest" is the destination folder for the file and the ".single('file') is stating that it will only be one file and the name will be 'file'</p>
		<p>NOTE: The name of 'file' comes from the form in which the file will be selected <code>name="file"</code></p>
		<p>You can read more about <a href="https://www.npmjs.com/package/multer">multer</a> on the NPM website.</p>
		<p>The next part of our route is the controller method we will be calling.</p>

		<h2>Creating the adddoc.js Controller file</h2>
		<p>In the <code>controllers/admin/</code> folder you want to create a file named <code>adddoc.js</code>. The code for this file is shown below.</p>
<pre><code class="javascript">var fs = require('fs');
var documentModel = require('../../models').Document;
var js = '<script src="/public/js/Ajax.js"></script>';
js += '<script src="/public/js/main.js"></script>';
module.exports = {
	index : function (req, res){
		if(req.session.success){
			res.render('admin/adddoc',{title: 'Admin Add Documents', heading: 'Admin Add Documents', admin: true, js: js});
		}
		else{
            /* I HAD TO USE A REDIRECT HERE.  IN ORDER TO PASS AN ERROR MESSAGE I ADDED THE ERROR=1 PARAMETER */
            res.redirect('/user/login/?error=1');
        }
	},
	addDoc : function (req, res){
		
		if (req.file.mimetype === 'application/pdf' &amp;&amp; req.file.size &lt; 50000){
			fs.rename('./public/docs/'+req.file.filename, './public/docs/'+req.file.filename+'.pdf', function (err) {
				if(err){
					console.log(err);
				}
				else{
					var documentData = {}
					documentData.fileName = req.body.data;
					documentData.filePath = '/public/docs/'+req.file.filename+'.pdf';

					var doc = new documentModel(documentData);
					doc.save(function(err){
						if(err){
							res.send('error');
						}
						else {
							res.send('success');
						}
					});

				}
			});
		}
		else {
			res.send('error');
		}
		
	}

}</code></pre>
	<p>The "index" function just loads the form when the page is called nothing major here.</p>
	<p>The "addDoc" function first checks to make sure this file is a pdf file and the size is less than 50000 bytes (50kb).  The problem with this code is it checks after the file has been uploaded which really does not protect anything, but I wanted to show how you can access file data.  In a future lesson I will show you how to protect the server from having too big of a file uploaded.</p>
	<p>NOTE: Notice the "req.file" not "req.body" like with body parser.</p>
	<p>The second part "fs.rename" renames the file.  What multer does is upload the file and give is a very specific name which is a scrambled combination of letter and numbers (ie:4eb0630b667e94cdfd3c20038812d6b7).  This insures that each file is unique. You can always change the name but I like to keep it as is, however, you must add the file extention of .pdf as multer will not do that.  That is what the fs.rename method does.</p>

	<p>Once the file is renamed the rest of the code adds the file name (notice req.body.data) and the file path into the database.</p>

	<h2>Updating the Frontend JavaScript</h2>
	<p>We have to make some changes to the front end javascript file for this to work.  The following code was added to the <code>public/js/main.js</code> file</p>
<pre><code class="javascript">cp.uploadfile = function(){
	/* GET FILE NAME AND FILE*/
	var file = document.getElementById('file');
	var fileName = document.getElementById('filename').value;
	
	/* CREATE A NEW FORMDATA OBJECT*/
	var formData = new FormData();
	
	/* APPEND THE FILE NAME AND FILE*/
	formData.append('file', file.files[0]);
	formData.append('data', fileName);

	/* TELL USER THE DATA IS BEING SAVED */
	cp.ackMsg('Saving file please wait...', '#000', true);

	/*SEND AJAX REQUEST*/
	Ajax.sendRequest('/admin/adddoc/',function(res){
		/*IF ERROR DISPLAY GENERIC MESSAGE*/
		if(res.responseText === 'error'){
			cp.ackMsg('Sorry there was a problem saving the file', '#F00', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
		/*IF NOT ERROR THEN STATE FILE SAVE WAS SUCCESSFUL*/
		else if (res.responseText === 'success'){
			cp.ackMsg('File was successfully saved', '#000', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
	},formData, true);
	
}</code></pre>

		<p>First we get the file and the filename that is pretty straight forward.  But then we need the <code>formData</code> object.  The FormData object lets you compile a set of key/value pairs to send using XMLHttpRequest. It is primarily intended for use in sending form data, but can be used independently from forms in order to transmit keyed data. The transmitted data is in the same format that the form's submit() method would use to send the data if the form's encoding type were set to multipart/form-data.</p>

		<p>We append the file and the filename to the formData object and then ship that object to the server via the AJAX class.</p>

		<p>NOTE: I had to modify the AJAX class to allow it to handle file uploads the modified version is the version you have.  Notice at the end I have to send the formData and a value of true.  The true part tells the class a file is being sent </p>

		<h2>Final</h2>
		<p>With the frontend javascript file completed we are done with this part of the build.  We can now send files and text via AJAX.</p>
		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>