<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Removing Files');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Removing Files");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
			<h2>IMPORTANT NOTE</h2>
			<p>If you added files from build 7.0 they will be in the database but not in the build 8.0/8.1 folders so this will cause a problem. It is recommended that all build8.0/8.1 files and database entries be removed first.</p>
			<h2>Filenaming Change</h2>
			<p>To start this lesson copy the cp-build7.0 and rename the copy to cp-build8.0</p>
			<p>In the past builds I have the file <code>controllers/admin/adddoc.js</code>. Because I wanted to add the showing and removing of document to that file as well I renamed it to <code>controllers/admin/docs.js</code>, in doing so I had to change it in the <code>routes.js</code> page as well.</p>

		    <h2>Creating the Admin View</h2>
		    <p>In this lesson we will be creating a table that will display all the files in the database and allow us to view or delete them.  First we need to create the view file that will display the table.  I created a file named <code>showdoc.handlebars</code> and placed it in the <code>views/admin/</code> folder.  The code is shown below.</p>

<pre><code class="html">&lt;main&gt;
	&lt;!-- I CREATED THE DIV OF TABLE SO I COULD ASSIGN AN EVENT LISTENER TO THAT INSTEAD OF THE TABLE, THIS ALLOWS ME MORE FLEXIBILITY IN DEALING WITH THE RE-LOADING OF THE TABLE VIA AJAX. --&gt;
	&lt;div id="table"&gt;
		&lt;table class="table table-striped table-bordered"&gt;
			&lt;thead&gt;
				&lt;tr&gt;
					&lt;th style="width: 70%"&gt;File Name&lt;/th&gt;
					&lt;th style="width: 30%"&gt;Delete File&lt;/th&gt;
				&lt;/tr&gt;
			&lt;/thead&gt;
			&lt;tbody&gt;
				{{#each docs}}
					&lt;tr&gt;
						&lt;td&gt;&lt;a href="{{filePath}}"&gt;{{fileName}}&lt;/a&gt;&lt;/td&gt;
						&lt;td id="{{_id}}" class="link"&gt;Delete&lt;/td&gt;
					&lt;/tr&gt;
				{{/each}}
			&lt;/tbody&gt;
		&lt;/table&gt;
&lt;/div&gt;
&lt;div id="ack"&gt;&lt;/div&gt;
&lt;/main&gt;</code></pre>

		<p>In the above code I create the table using the handlebars each loop.  It gets the records returned from the database and creates a table row and cell(s) for each record (document). Notice where I have the delete link I store the unique id for each record.</p>
		<p>At the end of the script I have a div with the id of "ack" that is a container for any messages I need to display to the user.</p>

		<h2>Updating the Admin/docs.js file</h2>
		<p>In order to get the data I need I must update the <code>controller/admin/docs.js</code> file.  The additional code is shown below.</p>

<pre><code class="javascript">showDoc : function(req, res){
	/*HERE I AM USING THE JSON TECHIQUE FOR QUERYING THE DOCUMENT FOR ALL RECORDS, AND ONLY RETURNING THE FILENAME AND FILE PATH.  I COULD HAVE JUST AS EASILY DONE THIS "DOCUMENT.MODEL.FIND(FUNCTION(ERR, DOCS){...});  I DID NOT BECAUSE I WANTED TO DEMONSTRATE THIS TECHINIQUE AS FOUND ON THE MONGOOSE WEBSITE HTTP://MONGOOSEJS.COM/DOCS/QUERIES.HTML"*/
	documentModel.find({}).
	select({fileName: 1, filePath: 1, _id: 1}).
	exec(function(err, docs){
		if(err){
			console.log(err);
		}
		else{
			if(req.session.success){
				res.render('admin/showdoc', {docs: docs, title: 'Admin Show/Remove Documents', heading: 'Admin Show/Remove Documents', admin: true, js: js });
			}
			else{
				res.redirect('/user/login/?error=1');
			}
		}
	});
},</code></pre>

		<p>In the above code I query the database for the filename, filepath, and id of each record (document).  In the 'exec' method I get an error or docs returned.  Docs is the JSON formatted result of the query.  When I render the page I pass docs to a property name of docs.  On the handlebars page I loop through the JSON object using the <code>#each docs</code> method of handlebars.</p>

		<p>This is a clear example of how easy it is to return a bunch of records as a JSON object and then display them on a webpage as a list or table via handlebars.</p>

		<p>NOTE: This table is created everytime the page loads there are no AJAX calls being made to initially create the table.</p>

		<h2>Removing a File</h2>
		<p>The above code displays all the files and a link option to delete a file.  In order to accomplish this we will use AJAX.  We have to add to our front end JavaScript file <code>public/js/main.js</code>.  First I assign an click event to the div with the id of 'table'.</p>
<pre><code class="javascript">if(document.getElementById('table')){
		document.getElementById('table').addEventListener('click', cp.deleteFile, false);
	}</code></pre>

	<p>The code for the <code>cp.deleteFile</code> method is shown below.</p>

<pre><code class="javascript">cp.deleteFile = function(e){
		
	if(e.target.innerHTML === 'Delete'){
		/*THE MESSAGE WILL CONTAIN CONFIRMATION BUTTONS*/
		var msg = "&lt;p&gt;You are about to permanently delete this file.  If this is what you want to do click 'OK', otherwise click 'Cancel'&lt;/p&gt;";
		msg += '&lt;div id="buttons"&gt;&lt;input type="button" value="OK" id="okay"&gt;&lt;input type="button" value="Cancel" id="cancel"&gt;&lt;/div&gt;';
		var tr = e.target.parentNode;
		cp.ackMsg(msg, '#000', true);
		
		/*CREATE A DATA OBJECT*/
		var data = {}

		/*ADD THE ID AND THE PATH TO THE FILE*/
		data.id = e.target.id;
		var pathArr = tr.firstElementChild.firstElementChild.href.split('/');
		data.path = pathArr[pathArr.length - 1];
		
		/*STRINGIFY THE OBJECT SO THAT WILL PASS AS A STRING TO THE SERVER*/
		data = JSON.stringify(data);
		
		/*ADD AND ONLICK EVENT TO THE BUTTONS OF THE ACKNOWLEDGEMENT BOX*/
		document.getElementById('buttons').addEventListener('click', addEvent, false);
		
		function addEvent(e){
			if(e.target.id === 'okay'){
				
				/*REMOVE EVENT LISTENER SO IT IS NOT SITTING IN MEMORY*/
				document.getElementById('buttons').removeEventListener('click', addEvent, false);

				/* TELL USER THE FILE IS BEING REMOVED */
				cp.ackMsg('Deleting file please wait...', '#000', true);

				/*SEND REQUEST TO SERVER VIA AJAX*/
				Ajax.sendRequest('/admin/deletedoc/',function(res){
					if(res.responseText === 'error'){
						cp.ackMsg('Sorry there was a problem deleting the file', '#F00', true);
						setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
					}
					else if (res.responseText === 'success'){
						/*REMOVE EVENT LISTENER SO IT IS NOT SITTING IN MEMORY*/
						document.getElementById('buttons').removeEventListener('click', addEvent, false);

						cp.ackMsg('File was successfully deleted', '#000', true);
						/*REMOVE ROW THAT WAS CLICKED
						NOTE: IN THIS CASE I JUST REMOVED THE ROW FROM THE TABLE, BUT SOMETIMES YOU MAY HAVE TO RECREATE THE TABLE.  IN THOSE CASES YOU WOULD MAKE ANY CHANGES TO THE DATABASE FIRST AND THEN REQUERY THE DATABASE FOR THE UPDATED RECORDS AND RECREATE THE TABLE EITHER ON THE SERVER AND SEND IT (AN EXAMPLE OF THIS IS IN BUILD 8.1 AND ALL THE BUILDS AFTER THAT), OR SEND THE DATA AS A JSON STRING AND REBUILD THE TABLE ON THE CLIENT SIDE.*/
						tr.remove();

						setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
					}
				}, data, false);
			}
			else if(e.target.id === 'cancel'){

				/*REMOVE EVENT LISTENER SO IT IS NOT SITTING IN MEMORY*/
				document.getElementById('buttons').removeEventListener('click', addEvent, false);

				/*HIDE ACKNOWLEDGMENT MESSAGE*/
				cp.ackMsg('','#000',false);
			}
		}
	}
}</code></pre>

		<p>In the above code I first identify that the delete link was clicked by checking the innerHTML of the element that was clicked.  This is an example of using event delegation.  Once that link is click an acknowledgment message appears confirming that the user does want to delete that file.  The code that follows creates a data object and gets the document id and filePath for the file that is to be removed.  Because it is a JSON object I use <code>JSON.stringify</code> to convert it to a string so I can send it to the server.  I then add a click event to the acknowledgment box that was displayed for each button.  Again I use event delegation.</p>

		<p>NOTE: I had to add the click event when the box appeared or it would not work.  I could have added the click event to the div that contains the acknowledgment box that would have prevented me from having to add and remove it each time and may have been a better option.</p>

		<p>If the user clicks the okay button an AJAX request is sent to the server containing the stringified data object that was created.  Just before the AJAX request is sent the event listener is removed and the user gets a message that states "Deleting file please wait...".  It is important to tell the user what is happening behind the scenes so they don't keep clicking button or links thinking nothing is happening.</p>

		<p>The AJAX send the data and if there is a problem displays a generic error, of not tell the user the file was deleted.  Also, if successful, the table row is also deleted using the <code>remove()</code> method.  I get the table row that needs to be deleted by getting the parent node of that is being clicked (<code>var tr = e.target.parentNode;</code>)</p>


		<p>If the user click 'Cancel' the event listener is removed and the confirmation box is removed.</p>

		<h2>Updating the Routes.js File</h2>
		<p>I have to update the routes.js file the code is shown below</p>

<pre><code class="javascript">router.post('/admin/deletedoc/', admindocs.deleteDoc);</code></pre>

		<h2>Updating the Docs.js File</h2>
		<p>We have to update the <code>controllers/admin/docs.js</code> file to handle removing the file.  The code is shown below.</p>

<pre><code class="javascript">deleteDoc : function(req, res){
	var data = JSON.parse(req.body.data);
	
	/*REMOVE THE DOCUMENT FROM THE DATABASE FIRST*/
	documentModel.findByIdAndRemove(data.id, function (err){
		if(err){
			console.log(err);
			res.send('error');
		}
		/*IF SUCCESSFULLY REMOVED FROM THE DATABASE REMOVE IT FROM THE FOLDER.*/
		else {
			var path = './public/docs/'+ data.path;
			fs.unlink(path, function(err){
				if(err){
					console.log(err);
					res.send('error');
				}
				else{
					res.send('success');
				}
				
			});
		}
	});
}</code></pre>

		<p>The code is pretty straight forward.  First we remove the record (document) from the database using the <code>findByIdAndRemove(...)</code> method (notice I use the JSON.parse method to turn the stringified object back into an object). If that is successful then we remove the file form the server using the <code>unlink()</code> method.</p>

		<p>If everything is successful we return the string "success" otherwise we return the string "error".</p>

		<h2>Build 8.1</h2>
		<p>In build8.1 I did the table differently.  Instead of removing the table row on the front end, instead I recreate the table on the backend and send it.  The modification are not too bad.  On the server side the following changes were made to the <code>controllers/admin/docs.js</code> file</p>

<pre><code class="javascript">	deleteDoc : function(req, res){
	var data = JSON.parse(req.body.data);
	
	/*REMOVE THE DOCUMENT FROM THE DATABASE FIRST*/
	documentModel.findByIdAndRemove(data.id, function (err){
		if(err){
			console.log(err);
			res.send('error');
		}
		/*IF SUCCESSFULLY REMOVED FROM THE DATABASE REMOVE IT FROM THE FOLDER.*/
		else {
			var path = './public/docs/'+ data.path;
			fs.unlink(path, function(err){
				if(err){
					console.log(err);
					res.send('error');
				}
				else{
					/* REQUERY THE DATABASE AND GET ALL THE DOCUMENTS */
	    			documentModel.find({}).
					select({fileName: 1, filePath: 1, _id: 1}).
					exec(function(err, docs){
						/* CREATE THE NEW TABLE BASED UPON THE DATABASE QUERY */
						var table = createTable(docs);
						/* SEND THE TABLE AND THE SUCCESS MESSAGE */
						res.send('success^^^'+table);
	    			});
				}
				
			});
			
		}
		});
}</code></pre>

		<p>After I removed the document from the database and the file from the server; I required the database and sent the object to a function named <code>createTable()</code>.  This function is created outside of the module.exports object.  I had to do this so it would work correctly, the code is shown below.</p>

<pre><code class="javascript">/* IN THIS EXAMPLE I WILL CREATE THE TABLE ON THE SERVER AND SEND IT BACK VIA AJAX.  I COULD HAVE JUST SENT THE JSON STRINGIFIED OBJECT BACK AND CREATE THE TABLE ON THE CLIENT SIDE BUT I WANTED TO DEMONSTRATE THIS TECHNIQUE  NOTICE HOW I HAVE THE FUNCTION OUTSIDE OF THEM MODEL EXPORT.  WHEN I ATTEMPTED TO PUT THE FUNCTION WITHIN THE MODULE EXPORT IT DID NOT WORK. ALSO NOTICE THAT I COULD PASS THE OBJECT(DOCS) DIRECTLY I DID NOT HAVE TO STRINGIFY IT FIRST, THAT IS BECAUSE IT IS ON THE SAME SERVER AND IS NOT GOING ACROSS THE INTERNET.*/
function createTable(data){
	var len = data.length;
	var i = 0;
	var table = '&lt;table class="table table-striped table-bordered"&gt;';
	table += '&lt;thead&gt;';
	table += '&lt;tr&gt;';
	table += '&lt;th style="width: 70%"&gt;File Name&lt;/th&gt;&lt;th style="width: 30%"&gt;Delete File&lt;/th&gt;';
	table += '&lt;/tr&gt;&lt;/thead&gt;&lt;tbody&gt;';

	while(i &lt; len){
		table += '&lt;tr&gt;';
		table += '&lt;td&gt;&lt;a href="'+data[i].filePath+'"&gt;'+data[i].fileName+'&lt;/a&gt;&lt;/td&gt;';
		table += '&lt;td id="'+data[i]._id+'" class="link"&gt;Delete&lt;/td&gt;';
		table += '&lt;/tr&gt;';
		i++;
	}
	table += '&lt;/tbody&gt;&lt;/table&gt;';
	return table;
}</code></pre>

		<p>All this method does is loop through the data and create the table "code".  Notice it created the table code as a string, it take the browser to actually display the table.</p>

		<p>Once the table is created I send that back to the client.  I do that using a delimited string as shown.</p>

<pre><code class="javascript">res.send('success^^^'+table);</code></pre>

		<p>On the front end I modified the <code>public/js/main.js</code> file, as shown below</p>

<pre><code class="javascript">Ajax.sendRequest('/admin/deletedoc/',function(res){
	responseArr = res.responseText.split('^^^');
	if(responseArr[0] === 'error'){
		cp.ackMsg('Sorry there was a problem deleting the file', '#F00', true);
		setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
	}
	else if (responseArr[0] === 'success'){
		

		cp.ackMsg('File was successfully deleted', '#000', true);

		/*REMOVE ROW THAT WAS CLICKED.  THIS IS DONE BY OVERWRITING THE CONTENT OF THE DIV WITH THE ID OF TABLE WITH THE NEW TABLE CREATED ON THE SERVER.*/
		document.getElementById('table').innerHTML = responseArr[1];

		setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
	}
}, data, false);</code></pre>

		<p>I split the string on the "^^^" delmiter and check the first index of the responseArr array.  If successful, I replace the data in the div with the id of "table" with the updated table string.  The user sees the table row dynamically removed the actually the whole table was re-written.</p>

		<p>Build 8.1 is just another way doing the same thing as build 8.1</p>

		<h2>Creating The User View File</h2>
		<p>The user needs a page where they can see all the documents and click on the document they want.  In the <code>views/user/</code> directory I created a page named <code>docs.handlebars</code>, the code is shown below</p>

<pre><code class="html">&lt;main&gt;
	&lt;!-- I CREATED THE DIV OF TABLE SO I COULD ASSIGN AN EVENT LISTENER TO THAT INSTEAD OF THE TABLE, THIS ALLOWS ME MORE FLEXIBILITY IN DEALING WITH THE RE-LOADING OF THE TABLE VIA AJAX. --&gt;
	&lt;div id="table"&gt;
		&lt;table class="table table-striped table-bordered"&gt;
			&lt;thead&gt;
				&lt;tr&gt;
					&lt;th&gt;File Name&lt;/th&gt;
					
				&lt;/tr&gt;
			&lt;/thead&gt;
			&lt;tbody&gt;
				{{#each docs}}
					&lt;tr&gt;
						&lt;td&gt;&lt;a href="{{filePath}}"&gt;{{fileName}}&lt;/a&gt;&lt;/td&gt;
					&lt;/tr&gt;
				{{/each}}
			&lt;/tbody&gt;
		&lt;/table&gt;
&lt;/div&gt;
&lt;/main&gt;</code></pre>

		<p>This file is pretty much the same as the <code>views/admin/showdocs.handlebars</code> file except is is a single column table the lists the file names as links to their designated file.</p>

		<h2>Updating the Routes</h2>
<pre><code class="javascript">router.get('/user/docs', userdocs.showDoc);</code></pre>

		<h2>Updating the Main.js File</h2>
		<p>I don't have to do any modifications to the <code>controllers/admin/docs.js</code> file because I can use the showdocs method of that file. However I do have to update the <code>public/js/main.js</code> file.  First I have to add another click event listener to the div with the id of "table". That code is shown below.</p>

<pre><code class="javascript">/* EVENT LISTENERS ALLOW YOU TO ASSIGN THE SAME EVENT TO THE SAME OBJECT MORE THAN ONCE.  HERE I AM ASSIGNING AN ONCLICK EVENT TO THE TABLE TO BOTH DELETE A FILE AND SHOW A DOCUMENT.  BOTH METHODS ARE CALLED BUT ONLY ONE WILL FIRE BASED UPON WHAT IS BEING CLICKED. AND WHAT IS NEEDED TO BE DONE. */
	if(document.getElementById('table')){
		document.getElementById('table').addEventListener('click', cp.showDocument, false);
	}</code></pre>
		<p>You will notice that the same element has to 'click' event listeners assigned.  This is unique with event listeners you can assign multiple event listeners of the same event to the same element, but each event can call a different method.  Each event method uses event delegation to capture that is being clicked, in this case I am checking to see if an anchor element is being clicked, which indicates they want to view a document.  The code is shown below</p>

<pre><code class="javascript">cp.showDocument = function(e){
	e.preventDefault();
	if(e.target.nodeName.toLowerCase() === 'a'){
		window.open(e.target.href, '_blank');
	}
}</code></pre>

	<p>The code is pretty simple.  If an anchor element is clicked then we remove the default behavior (actually it is removed before the anchor element is checked, which is fine).  Then it opens the document is a new tab using the <code>window.open()</code> method.  If opening a document, if possible, it is nice to have the document open in a new tab so the user does not have to click the back button to get back to the web page.  Also, they can switch between the webpage and the document by just clicking the tab.</p>


		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>