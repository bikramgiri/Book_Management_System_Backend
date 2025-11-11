require('dotenv').config();
const express = require('express');
const app = express();
// Or
// const app = require('express')();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
