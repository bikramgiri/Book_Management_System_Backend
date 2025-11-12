require('dotenv').config();
const express = require('express');
const app = express();
// Or
// const app = require('express')();
const DBConnect = require('./database/server');

// Database Connection
DBConnect();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// Or
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World!' 
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
