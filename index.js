const express = require('express');
// https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
const db = require('./models/sequelize');

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
})