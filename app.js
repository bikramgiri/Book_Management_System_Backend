require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// Or
// const app = require('express')();

const { multer, storage, upload } = require("./middleware/multerConfig"); // Import multer and storage configuration
const DBConnect = require('./database/index');

// *Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Use when frontend in ejs not in react and other frameworks
app.use(
  cors({
    // origin: "*", // Allow requests from any origin
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

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

// *Give access to storage folder images
app.use("/storage", express.static("storage")); // Serve static files from the storage directory
// or
// give access to images in storage folder
// app.use(express.static('storage'))

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
