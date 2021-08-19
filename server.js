// enable environment variables as soon as project entry point called
require('dotenv').config();

const express = require('express');
// https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz

// note this db parameter is custom and lacks method name assignments from the sequelize init function
// since that function doesn't work on node v13 or higher so you can't call db.sync here. It is however 
// handled in models.sequelize already
const dbModels = require('./models/index');

// import the api routes from the routes folder - api/employee, role, department
const api = require('./routes/index');
// import custom clog middleware for request logging in color
const { clog } = require('./middleware/clog');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.listen(PORT, ()=>{
  console.log(`listening on: http://localhost:${PORT}`);
})

