import mysql from "mysql"
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Hmzavivo08@',
  database : 'dbms_project'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();