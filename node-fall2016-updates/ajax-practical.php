<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Ajax Practical');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Ajax Practical");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Introduction</h2>
		    <p>We are going to see how to implement AJAX into our project.  First copy the cp-build5.0 and rename the copy to cp-build6.0.  Create a folder within the public folder named "js". Copy the ajax script from the last lesson and paste it into a file named "Ajax.js" located in the <code>public/js</code> folder.  Create two other files and name them "main.js" and "tinymce.js" place them into the <code>public/js</code> folder.</p>

		    <h2>Update the Layout Page</h2>
		    <p>Open the <code>views/layouts/main.handlebars</code> page and add <code>{{{tinyMCE}}}</code> in the head section underneath the last link element</p>

<pre><code class="html">&lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"&gt;
&lt;link rel="stylesheet" href="/public/css/main.css"&gt;
{{{tinyMCE}}}</code></pre>

		     and add <code>{{{js}}}</code>	just above the closing body element.</p>

<pre><code class="html">&lt;script   src="https://code.jquery.com/jquery-2.2.4.min.js"   integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="   crossorigin="anonymous"&gt;&lt;/script&gt;
&lt;script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"&gt;&lt;/script&gt;
{{{js}}}</code></pre>

		<h2>Updating the Admin.js File.</h2>
		<p>The <code>controllers/admin/home.js</code> file will load the data for each corresponding user page but the content will be included into a WYSIWYG editor.  The editor I choose for this project is <a href="https://www.tinymce.com/">tinyMCE</a>.  To include the editor on the page we need to modify our <code>controllers/admin/home.js</code> file.  The changes are shown below</p>

<pre><code class="javascript">var content = require('../../models').Content;
var tinyMCE = '&lt;script src="//cdn.tinymce.com/4/tinymce.min.js"&gt;&lt;/script&gt;&lt;script src="/public/js/tinymce.js"&gt;&lt;/script&gt;';
var js = '&lt;script src="/public/js/Ajax.js"&gt;&lt;/script&gt;';
js += '&lt;script src="/public/js/main.js"&gt;&lt;/script&gt;';
</code></pre>

		<p>I create a variable "tinyMCE" which contains the script element which points to the tinyMCE cdn.  It also contains the script for the <code>public/js/tinymce.js</code> file that I created (we will look at that later).</p>
		 <p>I also created a variable named "js" which load my "Ajax" class and my "main.js" file.  I will need all these scripts to create my editor and save the content.</p>

		 <p>I have to add those script to the <code>layouts/main.handlebars</code> file so I add that part to my <code>res.render script</code>. Code for both pages shown below.</p>

		 <p>/admin page</p>

<pre><code class="javascript">res.render('admin/home',{pageData: pageData.text, title: 'Admin Home Page', heading: 'Admin Home Page', admin: true, tinyMCE: tinyMCE, js: js}); </code></pre>

		<p>admin/about page</p>

<pre><code class="javascript">res.render('admin/home',{pageData: pageData.text, title: 'Admin About Page', heading: 'Admin About Page', admin: true, tinyMCE: tinyMCE, js: js});</code></pre>

		<p>You can see that I add the code snippets.</p>

<pre><code class="javascript">tinyMCE: tinyMCE, js: js</code></pre>

		<h2>Changes to the admin/home.handlebars File</h2>
		<p>I had to change the <code>admin/home.handlebars</code> file so I could use the editor, display a "save" button, and an acknowledgment box the modified code is shown below.</p>
<pre><code class="html">&lt;main&gt;
	&lt;textarea id="editor"&gt;{{{pageData}}}&lt;/textarea&gt;
	&lt;input type="button" value="Save Page Data" id="savePage"&gt;
	&lt;div id="ack"&gt;&lt;/div&gt;
&lt;/main&gt;</code></pre>

		<p>The code is as follows.</p>
		<ul>
			<li>The textarea with the id of "editor" will become the editor for the page content.</li>
			<li>The button will allow us to save the data</li>
			<li>The div with the id of "ack" will display an acknowledgment telling the user the status of the save.</li>
		</ul>

		<h2>The tinymce.js File</h2>
		<p>Below are the contents of the <code>public/js/tinymce.js</code> file which setup our editor</p>
<pre><code class="javascript">tinymce.init({
  selector: '#editor'
});</code></pre>
		<p>All it does is set any textarea element with an id of "editor" to a WYSIWYG editor.  There are many other options that you can read about at the <a href="https://www.tinymce.com/">tinyMCE</a> website.</p>

		<h2>The main.js file</h2>
		<p>Below is the <code>public/js/main.js</code> file that we are using to save our content.</p>

<pre><code class="javascript">/*CREATE OBJECT*/
cp = {}

cp.init = function(){
	if(document.getElementById('savePage')){
		document.getElementById('savePage').addEventListener('click', cp.getContent, false);
	}
}

cp.getContent = function(){
	/*GET CONTENT OF A SPECIFIC EDITOR:*/
	var pageArr = window.location.href.split("/");
	var page = "/"+pageArr[pageArr.length - 1];
	switch(page){
		case "/" : page = '/admin/'; break;
		case "/about" : page = '/admin/about/'; break;
	}
	var data = tinymce.get('editor').getContent();
	/* I HAD TO USE THE ENCODEURICOMPONENT TO FILTER MY DATA BECAUSE THINGS LIKE AMPERSANDS & CAUSE PROBLEMS WITH NODE.*/
	data = encodeURIComponent(data);

	/*TELL USER THE DATA IS BEING SAVED*/
	cp.ackMsg('Saving data please wait...', '#000', true);

	/* SEND AJAX REQUEST*/
	Ajax.sendRequest(page, function(res){
		/* IF THERE IS AN ERROR DISPLAY A GENERIC ERROR MESSAGE*/
		if(res.responseText === 'error'){
			cp.ackMsg('Sorry there was a problem saving the data', '#F00', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
		/* UPON SUCCESS TELL USER IT WAS SUCCESSFUL, DISPLAY MESSAGE FOR 1.5 SECONDS */
		else if (res.responseText === 'success'){
			cp.ackMsg('Data was successfully saved', '#000', true);
			setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
		}
	}, data);
}

cp.ackMsg = function(msg, color, show){
	var acknowledgment = document.getElementById('ack');
	acknowledgment.style.color = color;
	acknowledgment.innerHTML = msg;

	if(show){
		acknowledgment.style.display = 'block';
	}
	else {
		acknowledgment.style.display = 'none';
	}
}

cp.init();
</code></pre>

		<p>First I create my object <code>cp</code></p>

		<p>Then I create my <code>cp.init</code> method which will set everything up when this file is called.  I am checking for the button element with the id of "savePage" if it is there I will set a click event to that button named "getContent"</p>
		<p>The <code>cp.getContent</code> method parses the page URL and depending on the URL is depends on what content it gets (admin or about).  The <code>tinymce.getContent('editor').content()</code> method gets the content from the editor (what the user typed).  A acknowledgment is sent to the user informing them that the data is being saved.  An AJAX request is sent to the server with the page content.  The server will take that content and save it to the database (that code shown later).  If the save is a success the server will send back the string "success" if not it will send back the string "error".  Depending on what the server response is depends on the next message the user sees.  This acknowledgment will only appear for 1.5 seconds.</p>
		<p>The <code>cp.ackMsg</code> method take three parameters (msg, color, show) that are as follows.</p>
		<ul>
			<li>msg - The message to be displayed</li>
			<li>color - The text color of the message</li>
			<li>show - Whether to display the acknowledgment box or not (boolean true display, false hide).</li>
		</ul>
		<p>All this function does is display or hide the acknowledgment message box with the proper message and font color.</p>

		<h2>Updating the admin/home.js File</h2>
		<p>I added to post calls to the <code>server/routes.js</code> file.</p>
<pre><code class="javscript">router.post('/admin/', admin.postindex);
router.post('/admin/about/', admin.postabout);</code></pre>

		<p>In the <code>admim/home.js</code> file I added the following code.</p>

<pre><code class="javascript">postindex: function(req, res){
        var data = req.body.data
        content.update({name: 'home'}, {text: data}, {runValidators: false}, function(err){
            if(err){
                /*SENDS THE ERROR TO CONSOLE.LOG*/
                console.log(err);
                res.send('error');
            }
            else{
                res.send('success');
            }
            
        });
    },
    postabout: function(req, res){
        var data = req.body.data
        content.update({name: 'about'}, {text: data}, {runValidators: false}, function(err){
            if(err){
                /*SENDS THE ERROR TO CONSOLE.LOG*/
                console.log(err);
                res.send('error');
            }
            else{
                res.send('success');
            }
            
        });        
    }</code></pre>
		<p>The methods are pretty simple.  They take the data sent and updated the document.  If the update was successful the server response back to the client "success" or if not "error".</p>
		<p>Notice I use the <code>res.send</code> method and not the res.render.</p>

		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>
