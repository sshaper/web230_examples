<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - MVC');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("MVC");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Introduction</h2>
		    <p>Model View Controller or MVC as it is popularly called, is a Architectural pattern for developing web applications. A Model View Controller pattern is made up of the following three parts:</p>
			
			<ul>
			<li><strong>Model</strong> - The lowest level of the pattern which is responsible for maintaining data.</li>

			<li><strong>View</strong> - This is responsible for displaying all or a portion of the data to the user.</li>

			<li><strong>Controller</strong> - Software Code that controls the interactions between the Model and View.</li>
			</ul>

			<img src="../../images/struts-mvc.png" alt="mvc image" />

			<p>MVC is popular as it isolates the application logic from the user interface layer and supports separation of concerns. Here the Controller receives all requests for the application and then works with the Model to prepare any data needed by the View. The View then uses the data prepared by the Controller to generate a final presentable response.</p>

			<h3>The model</h3>
			<p>The model is responsible for managing the data of the application. It responds to the request from the view and it also responds to instructions from the controller to update itself.</p>

			<h3>The view</h3>
			<p>A presentation of data in a particular format, triggered by a controller's decision to present the data. They are script based templating systems and are very easy to integrate with AJAX technology.</p>

			<h3>The controller</h3>
			<p>The controller is responsible for responding to user input and perform interactions on the data model objects. The controller receives the input, it validates the input and then performs the business operation that modifies the state of the data model.</p>

			<h2>Putting Files In Their Place</h2>
			<p>As stated the advantage of an MVC architecture is that everything has a place.  It seems confusing and overkill at first but once you have a proper structure set up, maintaining and updating the application is very easy.  You need to keep in mind that we will be using more then just a model, view, and controller folders.  Those are more of an overview.</p>

			<p>To better explain the MVC architecture and how it fits in with node we will build a class project.  As we learn new concepts we will be adding them to our class project.  I have provided the entire class project and all the separate builds in the mean-examples.  However I would recommend you rebuild it from scratch to see how everything fits together.  You could start from your root directory and create a folder named 'class-project'.  Just leave it empty for now, we will add things as we go.</p>

			<h2>Class Project</h2>
			<p>As we explore the technologies of using node as a backend webserver we will be building a web application named "class-project".  This application will be using the MVC architecture.  As we learn new concepts we will be adding to the class project.  The class project has 12 different build each one building on the previous.  Below is a table listing the builds, and corresponding lesson.</p>
			<p>NOTE: All the builds are in your 230 examples download or can be downloaded separately from <a href="../230-examples/mean-examples/class-project.zip">mean-examples/class-project.zip</a></p>

			<table class="data">
				<thead>
					<tr>
						<th style="width: 20%">Build</th>
						<th style="width: 20%">Lessons</th>
						<th style="width: 60%">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Build1.0</td>
						<td>Setting Up the Server</td>
						<td>This gets a basic web server up and running</td>
					</tr>
					<tr>
						<td>Build2.0</td>
						<td>Handlebars 1</td>
						<td>Demonstrates how to get handlebars templating up and running</td>
					</tr>
					<tr>
						<td>Build3.0</td>
						<td>Handlebars 2</td>
						<td>More in using and implementing Handlebars.</td>
					</tr>
					<tr>
						<td>Build4.0</td>
						<td>Sessions and Sending Form Data</td>
						<td>Demonstrates setting up sessions and sending form data</td>
					</tr>
					<tr>
						<td>Build4.1</td>
						<td>Storing multiple items in sessions</td>
						<td>Demonstrates how to store mutliple items in sessions.</td>
					</tr>
					<tr>
						<td>Build5.0</td>
						<td>Mongoose</td>
						<td>Demonstrates using Mongoose and schemas</td>
					</tr>
					<tr>
						<td>Build5.1</td>
						<td>Mongoose</td>
						<td>Demonstrates the CRUD operations</td>
					</tr>
					<tr>
						<td>Build6.0</td>
						<td>AJAX Pratical</td>
						<td>Adds AJAX to our class project</td>
					</tr>
					<tr>
						<td>Build7.0</td>
						<td>AJAX File Uploads</td>
						<td>Demonstrates doing file uploads via AJAX</td>
					</tr>
					<tr>
						<td>Build8.0</td>
						<td>Removing Files</td>
						<td>Displaying table of files and deleting the files using AJAX</td>
					</tr>
					<tr>
						<td>Build8.1</td>
						<td>Removing Files</td>
						<td>Same as build 8.0 but builds the table on the server and sends the code to the client</td>
					</tr>
					<tr>
						<td>Build9.0</td>
						<td>Secure passwords</td>
						<td>Creating secure passwords and multiple administrators</td>
					</tr>
					<tr>
						<td>Build9.1</td>
						<td>Eliminating Callbacks</td>
						<td>Demonstrates how to use function calls to elminate mutiple callbacks within an operation.  Look at the controller/home.js file "addadmin" method.</td>
					</tr>
					<tr>
						<td>Build10.0</td>
						<td>Finishing Up</td>
						<td>Adding HTTPS and File not found page</td>
					</tr>
					<tr>
						<td>Build10.1</td>
						<td>Finishing Up</td>
						<td>Automatically creates an HTTPS page regardless of what the user enters.</td>
					</tr>
				</tbody>
			</table>

			<h2>Installing NPM and Installing Modules</h2>
		    <p>One of the most powerful features of Node.js framework is the ability to easily extend it with additional Node Package Modules (NPM), using the Node Package Manager.  I will provide a walk through on how to get your project started (I was using digital ocean and node was already installed).</p>

		    <ol>
		    	<li><strong>Install/Check npm</strong> - First check to see if npm in already installed <code>npm -v</code> if you get a version number then you have npm installed and you can go on to the next step.  Otherwise installed npm <code>sudo apt-get install npm</code></li>
		    	<li><strong>Create web230 directory</strong> - enter mkdir /web230</li>
		    	<li><strong>Create mean-examples sub directory</strong> - enter mkdir /web230/mean-examples</li>
		    	<li><strong>Go to mean-examples directory</strong> - enter cd /web230/mean-examples</li>
		    	<li><strong>Create a class project directory</strong> - enter mkdir class-project</li>
		    	<li><strong>Install express (you should be inside the mean-examples directory)</strong> - enter <code>npm install express</code>.  When this operation is done you will see a "node_modules" directory within your mean-examples directory(npm automatically creates the directory if it is not already created). <span style="background: orange;">CAUTION: I am advising you to install the node modules when you are within the mean-examples directory and not from the different class build (cp_build) directories you will eventually create. This is because all those build directories will reference the "node_modules" directory in the mean-examples directory, thus eliminating having to install them separately for every build.  However, doing this will not allow you to update your separate package.json files using the "--save" flag (see table below).  In order to update your package.json file dependencies you will have to do that manually by entering the module name and version (please see the cp-build1.0 package.json file for an example.  You can get the current version number of a module using the code shown in the table below.</span></li>
		    	<li><strong>Install cp-build1.0</strong> - Here you can just upload your cp-build1.0 directory (or rebuild it from scratch if you want).  To do so you can use any sftp software you want (like fileZilla). Below is login information
					<ol>
						<li><strong>host</strong> - This will be your ip address</li>
						<li><strong>username</strong> - If it is digital ocean it will be "root"</li>
						<li><strong>password</strong> - Your password to get into your digital ocean ubuntu instance</li>
						<li><strong>port</strong> - Port number will be 22 (SFTP)</li>
					</ol>
					NOTE: By default you may be taken to the root directory, this is not where you want to be.  You will have to navigate to the /web230/mean-examples/class-project/ directory, then upload the cp-build1.0 file.
		    	</li>
		    	<li><strong>Starting the server</strong> - Navigate inside the cp-build1.0 folder, enter <code>node index</code> and press the enter key.  You will see a message appear stating "Server up : http://45.55.242.213:3000" obviously that is not your ip address, remember it is hard coded in.  Once you see that message open your browser window and enter your ip addres followed by a colon and port number 3000 (ie 45.55.242.213:3000) you should see a message stating "Congratulations! It works!".</li>

		    </ol>

		    <p>The following table lists some of the commands you will need to work with npm</p>

		    <table class="data">
		    	<thead>
		    		<tr>
		    			<th>Command</th>
		    			<th>Description</th>
		    		</tr>
		    	</thead>
		    	<tbody>
		    		<tr>
		    			<td>sudo apt-get install npm</td>
		    			<td>Installs node package manager (npm)</td>
		    		</tr>
		    		<tr>
		    			<td>npm -v</td>
		    			<td>Once npm is installed you can check the version.</td>
		    		</tr>
		    		<tr>
		    			<td>npm init</td>
		    			<td>Creates a package.json file for you. It will prompt you with some questions if you don't know the answer or don't want to answer it just hit the enter key.</td>
		    		</tr>
		    		<tr>
		    			<td>npm install &lt;packagename&gt; or npm install</td>
		    			<td>Installs the package (module) you need for your application. NOTE: You can also do <code>--save</code> and that will update your package.json file. (see my caution on this)<br>Also, if you have a package.json file already created runing this within your project directory will read the package.json file and install all the dependencies.</td>
		    		</tr>
		    		<tr>
		    			<td>npm view &lt;packagename&gt; version</td>
		    			<td>Checks the current version of the package you installed.</td>
		    		</tr>
		    	</tbody>
		    </table>
			
			
		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>