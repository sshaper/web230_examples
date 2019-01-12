Install nodemon
npm install -g nodemon

Had a problem with mysql after installing.  I had to use sudo mysql -u root -p because I was not root.  Important to know.

To get mysql to work
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

got solution from this page https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server