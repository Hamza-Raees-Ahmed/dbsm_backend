import express from "express"
import mysql from "mysql2"
import ServerlessHttp from "serverless-http";
import cors from "cors";

const app = express();
const port = 4000;


app.use(express.json());

app.use(cors());
//testing theee api 
app.get("/test",(req,res)=>{
  res.status(200).send("everything working perfect")
})









/// add user through email and password

app.post('/users', (req, res) => {
  const { user_name, user_email } = req.body;

  if (!user_name || !user_email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO users (user_name, user_email) VALUES (?, ?)
  `;

  pool.query(query, [user_name, user_email], (err, result) => {
    if (err) {
      console.error('User insert error:', err);
      return res.status(500).json({ error: 'Database error while inserting user' });
    }

    res.status(201).json({ message: 'User created', userId: result.insertId });
  });
});



//// get all the records from the mysql database 
app.get('/menu', (req, res) => {
  const query = 'SELECT * FROM menu';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching menu:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(results); // sends all rows as JSON
  });
});

////// post the menu in database 
app.post('/add-menu', (req, res) => {
  const { menu_name, menu_category, menu_price, menu_description } = req.body;


  if (!menu_name || !menu_category || !menu_price) {
    return res.status(400).json({ error: 'menu_name, menu_category, and menu_id are required.' });
  }

  console.log(menu_category,menu_price,menu_name);
  const query = `
    INSERT INTO menu (menu_name, menu_category, menu_price, menu_description)
    VALUES (?, ?, ?, ?)
  `;

  pool.query(query, [menu_name, menu_category, menu_price, menu_description], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: 'Database error while inserting menu.' });
    }
    res.status(201).json({ message: 'menu added successfully', Id: result.insertId }); });
});

// DELETE: Remove menu by menu_name
app.delete('/menu/:menu_id', (req, res) => {
  const menu_id = req.params.menu_id;
  console.log(menu_id, "menu id");

  const query = 'DELETE FROM menu WHERE menu_id = ?';

  pool.query(query, [menu_id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Database error while deleting menu' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.json({ message: 'Menu deleted successfully' });
  });
});


app.post('/reservations', (req, res) => {
  const { user_id, dated, guest_table } = req.body;

  if (!user_id || !dated || !guest_table) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO reservations (user_id, dated, guest_table)
    VALUES (?, ?, ?)
  `;

  pool.query(query, [user_id, dated, guest_table], (err, result) => {
    if (err) {
      console.error("Insert reservation error:", err);
      return res.status(500).json({ error: 'Database error while inserting reservation' });
    }

    res.status(201).json({ message: 'Reservation added successfully', reservationId: result.insertId });
  });
});




// GET: Get all reservations
app.get('/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations ORDER BY dated ASC';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      return res.status(500).json({ error: 'Database error while fetching reservations' });
    }

    res.json(results);
  });
});
////// contact post api 
app.post('/contact', (req, res) => {
  const { user_name, user_email, user_message } = req.body;

  if (!user_name || !user_email || !user_message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO contacts (user_name, user_email, user_message)
    VALUES (?, ?, ?)
  `;

  pool.query(query, [user_name, user_email, user_message], (err, result) => {
    if (err) {
      console.error('Error inserting contact message:', err);
      return res.status(500).json({ error: 'Database error while saving contact message' });
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  });
});


const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : 'root',
  password        : ',
  database        : 'dbms_project'
});
 
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

 



app.listen(port,()=>{
    console.log("server is running on",port)
})
ServerlessHttp(app);