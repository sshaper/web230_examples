<?php
include_once '../../classes/Pagelayout.php';

$Page = new Pagelayout();

echo $Page->doctype();
echo $Page->metadata();
echo $Page->title('Web Development 3 - Multiple Administrators');
echo $Page->css();
?>	
</head>
<body>
	<div id="wrapper">
		<header role="banner" id="header">
		    <?php echo $Page->header("Multiple Administrators");?>
		</header>
		<nav role="navigation" aria-label="main nav">
		    <?php echo $Page->nav();?>
		</nav>
		<main id="main" role="main">
		    <h2>Introduction</h2>
		    <p>In this lesson we are going to look at creating administrator access that requires a username and password for each admin and encrypts the password.  Copy your cp-build8.0 and rename the copy to cp-build9.0</p>

        <p>NOTE IMPORTANT: If you are having problems getting bcrypt to install do the following</p>
          <ol>
            <li>apt-get install build-essential</li>
            <li>npm install bcrypt</li>
          </ol>
  

		    <h2>Updating the Package.json File</h2>
		    <p>I have to add a module named "bcrypt" the updated <code>package.json</code> file is shown below</p>

<pre><code class="javascript">{
  "name": "classproject",
  "version": "9.0",
  "description": "Class Project",
  "author": "Scott Shaper",
  "license": "ISC",
  "dependencies": {
  	"body-parser": "^1.14.1",
    "express": "^4.13.3",
    "express-handlebars": "^2.0.1",
    "express-session": "^1.12.1",
    "mongoose": "^4.3.0",
    "multer":"^1.1.0",
    "bcrypt":"^0.8.7"
   }
}
</code></pre>

		<h2>Creating the view</h2>
		<p>We have to create a view that contains the add admin form. I created a file in the <code>views/admin/</code> folder named <code>addadmin.handlebars</code>, the code is as follows</p>

<pre><code class="html">&lt;main&gt;
	&lt;h2&gt;Add Administrators&lt;/h2&gt;
	&lt;p&gt;Enter Admin Username and Password and click 'Add Administrator'&lt;/p&gt;
	&lt;form action="/admin/addAdmin/" method="post"&gt;
	  &lt;div class="form-group"&gt;
	    &lt;label for="username"&gt;Username&lt;/label&gt;
	    &lt;input type="text" class="form-control" id="username" name="username" placeholder="Username"&gt;
	  &lt;/div&gt;
	  &lt;div class="form-group"&gt;
	    &lt;label for="password"&gt;Password&lt;/label&gt;
	    &lt;input type="password" class="form-control" id="password" name="password" placeholder="Password"&gt;
	  &lt;/div&gt;
	  &lt;div class="form-group"&gt;
	    &lt;button type="button" class="btn btn-default" id="addAdminBtn"&gt;Add Administrator&lt;/button&gt;
	  &lt;/div&gt;
	&lt;/div&gt;
	&lt;div id="ack"&gt;&lt;/div&gt;
&lt;/main&gt;</code></pre>

		<p>Nothing to great here just a form that takes a user name and password.  The other page that was modified is the login page <code>views/user/login.handlebars</code>, basically it is a form that requires a username and password</p>

<pre><code class="html">&lt;main&gt;
	&lt;h2&gt;Login To Admin Area&lt;/h2&gt;
	&lt;p&gt;Enter password and click submit&lt;/p&gt;
	&lt;p class="error"&gt;{{error}}&lt;/p&gt;
	&lt;form action="/user/login/" method="post"&gt;
	  &lt;div class="form-group"&gt;
	    &lt;label for="username"&gt;Username&lt;/label&gt;
	    &lt;input type="text" class="form-control" id="username" name="username" placeholder="Username"&gt;
	  &lt;/div&gt;
	  &lt;div class="form-group"&gt;
	    &lt;label for="password"&gt;Password&lt;/label&gt;
	    &lt;input type="password" class="form-control" id="password" name="password" placeholder="Password"&gt;
	  &lt;/div&gt;
	  &lt;div class="form-group"&gt;
	    &lt;button type="submit" class="btn btn-default"&gt;Submit&lt;/button&gt;
	  &lt;/div&gt;
	&lt;/div&gt;
&lt;/main&gt;</code></pre>

		<h2>Updating the Routes</h2>
		<p>I added some code to the <code>server/routes.js</code> file.  The get route just displays the form and the post route adds the administrator.</p>

<pre><code class="javascript">router.get('/admin/adminform/', admin.adminform);
	...
router.post('/admin/addadmin/',admin.addadmin);</code></pre>

		<h2>Creating the Admin Schema</h2>
		<p>Because we are storing administrators usernames and passwords in a database I had to create another model, the code is below.</p>

<pre><code class="javascript">var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	username: String,
	password: String},
	{collection: 'admin'});

module.exports = mongoose.model('Admin', adminSchema);</code></pre>

		<p>The model is pretty straight forward it contains a username and a password.  I also added the model to the <code>models/index.js</code> file.</p>

<pre><code class="javascript">*THIS INDEX PAGE ALLOWS USE TO LOAD OUR MODELS AS SEEN IN THE CONTROLLER EXAMPLES*/
module.exports = {
	'Content':require('./content'),
	'Document':require('./document'),
	'Admin':require('./admin')
};</code></pre>

		<h2>Updating the Home.js File</h2>
		<p>I had to add two methods to the <code>controllers/admin/home.js</code> file.  The first is straight forward it just loads the web page</p>

<pre><code class="javascript">adminform: function(req, res){
    if(req.session.success){
        res.render('admin/addadmin',{title: 'Add Administrator', heading: 'Add Administrator', admin: true, js: js});
    }
},</code></pre>

		<p>The other method is more complicated as it adds the administrator to the database and encrypts the password.  I had to require the admin model <code>var adminModel = require('../../models').Admin;</code> at the top of the file and the <code>addAdmin</code> method is shown below</p>

<pre><code class="javascript">addadmin: function(req, res){
        var data = JSON.parse(req.body.data);

        /*REQUIRE BCRYPT AND SET THE SALT ROUNDS*/
        var bcrypt = require('bcrypt');
        var saltRounds = 10;
        var pw = data.pw;
        var documentData = {}

        
        /*BECAUSE BCRYPT.HASH IN AN ASYNCHRONOUS FUNCTION I HAVE TO WAIT FOR IT TO CALLBACK BEFORE I CAN DO ANYTHING ELSE OTHERWISE THE REST OF MY CODE WILL RUN BEFORE THE HASHED VALUE IS RETURNED.  SO I NEED TO NEST THE REST OF MY CODE IN THE CALLBACK OF BCRYPT.HASH.*/
        bcrypt.hash(pw, saltRounds, function(err, hash) {
                if(err){
                    console.log(err)
                }
                else{
                    documentData.password = hash;
                    documentData.username = data.un;
                    
                     /*CHECK FOR THE USERNAME TO EXIST*/
                    adminModel.findOne({username: data.un}, function(err, name){
                        if(err){
                            console.log(err);
                        }
                        else{
                           /*IF THE USERNAME IS NOT FOUND ENTER THE USERNAME AND THE PASSWORD*/
                            if(name === null){
                                var admin = new adminModel(documentData);
                                admin.save(function(err){
                                    if(err){
                                        res.send('System Error Cannot Login');
                                    }
                                    else {
                                        res.send('Admin Account Created');
                                    }
                                });
                           }
                           /*IF THE USERNAME IS FOUND TELL THE USER THAT USERNAME IS ALREADY IN USE.*/
                           else {
                                res.send('Username already in use please pick another')
                           }
                           
                         }
                    });


                }
                
            });
    },</code></pre>

    	<p>Since the data is passed as a JSON stringified object I first created a JSON object from the data string using <code>JSON.parse</code></p>

    	<p>I then required the bcrypt module and set the salt to the default of 10.  The salt is a letter/number combination that is added to the password.  The reason is if someone got the password from the database the would have a very hard time decrypting it because of the salt.  You can read more about the salt on the <a href="https://www.npmjs.com/package/bcrypt">bcrypt</a> documenation.</p>

    	<p>The next thing I did was hash the password.  As the comments indicate because bcrypt.hash is an asynchronous function I have to wait for the callback before doing anything else, so I have to nest the database calls.</p>

    	<p>Once I hash the password I check to see if there is a username already in the database, if so, I inform the user and require a different username.  For my model I do not want two of the same usernames.  If the username does not exist in the database then I enter the username and hashed password into the database.</p>

    	<p>NOTE: It is never a good practice to store a unencrypted password in a database.</p>

    	<h2>Updating the Login.js File</h2>
    	<p>Now that we can store usernames and passwords we need to modify our <code>controller/user/login.js</code> file to check for usernames and passwords.  The updated code for the <code>access</code> method is shown below.</p>

<pre><code class="javascript">access: function(req, res){
      admin.findOne({username: req.body.username}, function(err, data){
          if(data === null){
              res.render('user/login',{error: 'No record found with that username and password'});
          }
          else {
            var bcrypt = require('bcrypt');
            bcrypt.compare(req.body.password, data.password, function(err, response) {
                if(response){
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
                else {
                  res.render('user/login',{error: 'Incorrect Username or Password'});
                }
            });

          }
      });
  },</code></pre>

  		<p>This method first checks for a matching username, if found, it gets the record (document) for that username.  It then checks the given password with the database password using the <code>bcrypt.compare()</code> method.  If the username and password checks out then the user is redirected to the admin page. If not, the user is directed back to the login page and given an error message as to why.</p>

  		<h2>Updating the Front End JavaScript</h2>
  		<p>I also had to modify the <code>public/js/main.js</code> page, the modifications are pretty straight forward as well, below is the code.</p>

<pre><code class="javascript">cp.addAdmin = function(){
	var password = document.getElementById('password').value;
	var userName = document.getElementById('username').value;
	var data = {};
	data.pw = password;
	data.un = userName;

	/*SENT THE DATA OVER AS A JSON STRING*/
	data = JSON.stringify(data);
	cp.ackMsg('Creating admin account please wait...', '#000', true);

	/*CLEAR THE USERNAME AND PASSWORD FIELDS*/
	password = '';
	userName = '';
	Ajax.sendRequest('/admin/addadmin/',function(res){
		/*HERE I JUST ENTERED THE RESPONSE TEXT AND ON THE SERVER SENT THE MESSAGE INSTEAD OF THE SUCCESS AND ERROR MESSAGES.  I DID THIS BECAUSE THE SERVER WILL BE SENDING MORE THAN TWO POSSIBLE MESSAGES SO I JUST SENT THE TEXT OVER.  JUST ANOTHER WAY OF UTILIZING THIS METHOD*/
		cp.ackMsg(res.responseText, '#000', true);

		/*HIDE ACKNOWLEDGMENT MESSAGE AFTER 1.5 SECONDS*/
		setTimeout(function(){cp.ackMsg('','#000',false)}, 1500);
	}, data);
	
}</code></pre>

		<p>One thing I did differently was with the error messages. The are generated on the server and then sent over because there were different error messages based upon the situation so a simple "success" and "error" would not work.</p>

		</main>
		<?php echo $Page->footer(); ?>
	</div><!--end wrapper-->
	<?php echo $Page->js();?>
</body>
</html>