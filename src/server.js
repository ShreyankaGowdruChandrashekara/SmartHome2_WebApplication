const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001; // Choose a port for your Node.js server
console.log(port)
app.use(cors());

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const mongoose = require ("mongoose");

let db; // MongoDB connection

// Connect to MongoDB
// MongoClient.connect('mongodb://localhost:27017/webappreviews', {
  mongoose.connect("mongodb://127.0.0.1:27017/webappreviews",{
   useNewUrlParser: true, useUnifiedTopology: true  })
   .then(() => {
    console.log("successfully connected to the database!");
    
    // Your server setup or other code that depends on the database connection
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', err);
    
  });
  // db = client.db('webappreviews'); // Use your MongoDB database name
  
  
const schema = {

    title: String,
    productRebate: String,
    productOnSale: String,
    userId: String,
    userAge: String,
    userGender: String,
    reviewRating: String,
    reviewDate: String,
    reviewText: String,
    retailerName: String,
    retailerCity: String,
    retailerState: String,
    retailerZip: String,
    productName: String,
    productCategory: String,
    productPrice: String,
    productCompany: String,
    productId: String,
    userOccupation: String
}


const monModel = mongoose.model("reviews", schema);
const now = new Date();
now.setHours(0, 0, 0, 0);


// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "smartportable",
  password: "root",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// API endpoint to add a review
app.post('/api/addReview', async (req, res) => {
  console.log(req.body)
  const {
    u,
    productname,
      productid,
      productcategory,
      productprice,
      productimg,
      productdesc,
      productmaker,
    ratings,
    reviews,
    age,
    gender,
    occupation
  } = req.body;
  const data = new monModel({
    title: "reviews",
    productRebate: "yes",
    productOnSale: "yes",
    userId: u,
    userAge: age,
    userGender: gender,
    reviewRating: ratings,
    reviewDate: now,
    reviewText: reviews,
    retailerName: "Michigan Avenue",
    retailerCity: "Chicago",
    retailerState: "IL",
    retailerZip: "60616",
    productName: productname,
    productCategory: productcategory,
    productPrice: productprice,
    productCompany: productmaker,
    productId: productid,
    userOccupation: occupation
  });
    const val = await data.save();
    res.json(val);
});

// API endpoint to get all reviews
app.get('/api/getAllReviews', (req, res) => {
  console.log("entered get reviews")
  // const allReviews = getAllReviews();
  // res.json(allReviews);
  monModel.find({}).lean().then(result => {
    console.log(result)
    res.json(result);
  }).catch(error => {
    console.error('Error fetching data:', error.message);
  });
});

// Function to add a review to MongoDB
function addReview(reviewDetail) {
  const reviews = db.collection('reviews');
  reviews.insertOne(reviewDetail, (err, result) => {
    if (err) {
      console.error('Error adding review:', err);
    } else {
      console.log('Review added:', result.ops);
    }
  });
}


app.get('/api/getProductReviews/:name', (req, res) => {
    const productName = req.params.name;
    console.log(productName)
    monModel.find({productName}).lean().then(result => {
      console.log(result)
      res.json(result);
    }).catch(error => {
      console.error('Error fetching data:', error.message);
    });
  });
  

app.listen(port, ()=> console.log(`Listening on Port ${port}`));


app.post('/api/login', (req, res) => {
  const { username, password, usertype } = req.body;
  connection.query(
    'SELECT * FROM users WHERE username = ? AND usertype = ? AND password = ?',
    [username, usertype, password],
    (error, results, fields) => {
      if (error) {
        console.error('Error querying database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        // No user found with the provided username, password, and usertype
        return res.status(401).json({ error: 'Invalid username, password, or user type' });
      }

      // Login successful
      return res.status(200).json({ user: results[0] });
    }
  );
});

// API endpoint to check if the username already exists
app.post('/api/checkUsername', async (req, res) => {
  const { username } = req.body;
  console.log(username)
  try {
      const [results] = await connection.promise().query('SELECT COUNT(*) as count FROM users WHERE userName = ?', [username]);
      const count = results[0].count;

      res.json({ exists: count > 0 });
  } catch (error) {
      console.error('Error checking username in MySQL:', error.message);
      res.status(500).json({ exists: true, error: 'Internal server error' });
  }
});

// API endpoint to add a new user
app.post('/api/addUser', async (req, res) => {
  const { username, password, usertype,address,city,custName,state,zip } = req.body;

  try {
      await connection.promise().query('INSERT INTO users (userName, password, userType,address,city,state,zip,storeId,CustName) VALUES (?, ?, ?,?,?,?,?,?,?)', [username, password, usertype,address,city,state,zip,3,custName]);
      res.json({ success: true });
  } catch (error) {
      console.error('Error adding user to MySQL:', error.message);
      res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


app.post('/api/addOrder', async (req, res) => {
  const { od,username, address,city,state,zip,cc,dlop,phno,order_date,shippingdate,total,storeid } = req.body;

  try {
      await connection.promise().query('INSERT INTO orders (orderID,customerName,address,city,state,zip,creditCardNumber,deilveryOption,phoneNumber,order_Date,shipping_date,total,storeId) VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?,?)', [od,username, address, city,state,zip,cc,dlop,phno,order_date,shippingdate,total,storeid]);
      res.json({ success: true })
  } catch (error) {
      console.error('Error adding order to MySQL:', error.message);
      res.status(500).json({ success: false, error: 'Internal server error' });
  }
});




app.get('/api/getorderID', (req, res) => {
  console.log("entered in the getAllProducts")
  const query = 'SELECT max(orderID) as od FROM orders';

  connection.query(query,(err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);
      }
  });
});

app.get('/api/allproducts', (req, res) => {
  // Fetch all products from the database
  connection.query('SELECT prod_id, prod_name FROM allprods', (error, results) => {
    if (error) {
      console.error('Error fetching products from database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});



app.get('/api/getAllProducts', (req, res) => {
  console.log("entered in the getAllProducts")
  const { category } = req.query;
  const query = 'SELECT * FROM allprods WHERE prod_cat = ?';

  connection.query(query, [category],(err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);
      }
  });
});

// Route to add a product
app.post('/api/addProduct', (req, res) => {
  const {
    pname,
    pdescription,
    pdiscount,
    pprice,
    pimage,
    pcondition,
    pcompany,
    pRebate,
    pSale,
    pcategory,
  } = req.body;
// Insert the product into the allprods table
const query =
'INSERT INTO allprods (prod_cat, prod_name, prod_price, prod_Description, prod_Retailer, prod_img, prod_disc, prod_condition, isRebate, isSale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

connection.query(
query,
[pcategory, pname, pprice, pdescription, pcompany, pimage, pdiscount, pcondition, pRebate, pSale],
(err, results) => {
  if (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.json({ success: true, productId: results.insertId });
  }
}
);
});


// Route to update a product
app.put('/api/updateProduct', (req, res) => {
  const {
    pId,
    pname,
    pdescription,
    pdiscount,
    pprice,
    pimage,
    pcondition,
    pcompany,
    pcategory,
    pquantity,
    pRebate,
    pSale
  } = req.body;
  console.log(req.body)


  // Create an object to store only non-empty values
  const updateData = {};
  if (pname !== undefined && pname !== '') updateData.prod_name = pname;
  if (pcategory !== undefined && pcategory !== '') updateData.prod_cat = pcategory;
  if (pprice !== undefined && pprice !== '') updateData.prod_price = pprice;
  if (pdescription !== undefined && pdescription !== '') updateData.prod_Description = pdescription;
  if (pcompany !== undefined && pcompany !== '') updateData.prod_Retailer = pcompany;
  if (pimage !== undefined && pimage !== '') updateData.prod_img = pimage;
  if (pdiscount !== undefined && pdiscount !== '') updateData.prod_disc = pdiscount;
  if (pcondition !== undefined && pcondition !== '') updateData.prod_condition = pcondition;
  if (pquantity !== undefined && pquantity !== '') updateData.quantity = pquantity;
  if (pSale !== undefined && pSale !== '') updateData.isSale = pSale;
  if (pRebate !== undefined && pRebate !== '') updateData.isRebate = pRebate;

  // Check if there are any fields to update
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }


  // Update the product in the allprods table
  const query =
  'UPDATE allprods SET ? WHERE prod_name = ?';

  connection.query(
    query,
    [updateData,pId],
    (err, results) => {
      if (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true, productId: pId });
      }
    }
  );
});

app.delete('/api/deleteOrder',(req,res)=>{

  const {orderID} = req.query;

  const deletequery = 'DELETE FROM orders where orderID = ?'
  connection.query(deletequery,[orderID],(err,results)=>{
    if (err) {
      console.error('Error deleting order:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if any rows were affected (product found and deleted)
    if (results.affectedRows > 0) {
      return res.status(200).json({ message: 'order deleted successfully.' });
    } else {
      // Product not found
      return res.status(404).json({ error: 'order not found.' });
    }
  })

})


app.delete('/api/deleteProduct', (req, res) => {
  // Assuming the product name is provided in the query parameter
  const { productName } = req.query;

  // Check if the product name is provided
  if (!productName) {
    return res.status(400).json({ error: 'Product name is required for deletion.' });
  }

  // SQL query to delete the product
  const deleteQuery = 'DELETE FROM allprods WHERE prod_name = ?';

  // Execute the query
  connection.query(deleteQuery, [productName], (err, results) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if any rows were affected (product found and deleted)
    if (results.affectedRows > 0) {
      return res.status(200).json({ message: 'Product deleted successfully.' });
    } else {
      // Product not found
      return res.status(404).json({ error: 'Product not found.' });
    }
  });
});

// Route for autocomplete
app.get('/autocomplete',  (req, res) => {
  try {
    const { action, searchId } = req.query;

    if (action === 'complete' && searchId) {
      const queryString = 'SELECT prod_id as Id, prod_name as Name,prod_img as Image,prod_cat as Type,prod_Description as `Desc`,prod_price as Price FROM allprods WHERE prod_name LIKE ? LIMIT 5';
    
    connection.query(queryString, [`${searchId}%`], (err, results) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log(res)
        res.json(results);
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
}
catch(e)
{

}});