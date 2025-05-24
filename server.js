import express from "express"
import mysql from "mysql2"

const app = express();
const port = 4000;


app.use(express.json());


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
  const query = 'SELECT * FROM products';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    res.json(results); // sends all rows as JSON
  });
});

////// post the menu in database 
app.post('/add-menu', (req, res) => {
  const { menu_name, menu_category, menu_price, menu_description } = req.body;

  if (!menu_name || !menu_category || !menu_price) {
    return res.status(400).json({ error: 'product_name, product_category, and project_id are required.' });
  }

  console.log(menu_category,menu_price,menu_name);
  const query = `
    INSERT INTO products (menu_name, menu_category, menu_id, menu_description)
    VALUES (?, ?, ?, ?)
  `;

  pool.query(query, [menu_name, menu_category, menu_price, menu_description], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: 'Database error while inserting product.' });
    }
    res.status(201).json({ message: 'Product added successfully', Id: result.insertId }); });
});

// DELETE: Remove product by ID
app.delete('/menu/:id', (req, res) => {
  const menuId = req.params.id;
 console.log(menuId,"menu id")
  const query = 'DELETE FROM products WHERE id = ?';

  pool.query(query, [menuId], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Database error while deleting product' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  });
});

app.post('/reservations', (req, res) => {
  const { user_id, date_time, guest_table } = req.body;

  if (!user_id || !date_time || !guest_table) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO reservations (user_id, date_time, guest_table)
    VALUES (?, ?, ?)
  `;

  pool.query(query, [user_id, date_time, guest_table], (err, result) => {
    if (err) {
      console.error("Insert reservation error:", err);
      return res.status(500).json({ error: 'Database error while inserting reservation' });
    }

    res.status(201).json({ message: 'Reservation added successfully', reservationId: result.insertId });
  });
});



// GET: Get all reservations
app.get('/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations ORDER BY date_time ASC';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      return res.status(500).json({ error: 'Database error while fetching reservations' });
    }

    res.json(results);
  });
});


const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'host address',
  user            : 'user name of the database',
  password        : 'password of the database ',
  database        : ' create the database eith this name "dbms_project"'
});
 
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});


 



app.listen(port,()=>{
    console.log("dserver is running on",port)
})