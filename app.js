require('dotenv').config();
const express = require('express');
const app = express();
// Or
// const app = require('express')();
const DBConnect = require('./database/server');

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Use when frontend in ejs not in react and other frameworks

// *Database Connection
DBConnect();

// *Routes
const bookRoute =  require('./routes/bookRoute');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// Or
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World!' 
  });
});

// *Using routes here
app.use("/", bookRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
