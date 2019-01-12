# web230_examples
These are the examples from my web230 class in JavaScript. To access the course you must be enrolled in the WEB230 class at Washtenaw Community College. These are the example files for my web230 class.

## Installing Modules
In order for the class-project builds to work you must install the modules.  To do this just run the package.json file from the web230_examples folder "sudo npm install".

You will have to also add the classProject database to MySQL.  Navigate to mean-examples/sqlfiles/ and enter mysql -u root -p < classProject.sql.  Enter your MySQL password.  File will be uploaded and database will be created.

Make sure you visit the mvc page in the course notes and look at the table for the class project.  Read the descriptions for each project build as they will have more information specific to that project.


## Example Files
The examples are as follows:

* fetch - Examples of using fetch api to upload information to the server. In order to use this example you must have node installed and you must install the modules. To do this just run the package.json file from the fetch folder "sudo npm install".  Also, make sure the fetch/public/uploads folder is public.  Go into the public folder and enter "sudo chmod 777 uploads"
