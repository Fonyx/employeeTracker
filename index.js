const express = require('express');
// https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
const {Employee, Role, Department} = require('./models/sequelize');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const {insertDepartment} = require('./helpers/comms');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`);
})


Department.create({name: 'test-department'})
.then(Department.findAll()
.then(departments => {
  console.log(departments);
}))



async function main() {
  // create the connection
  const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employee_db', password: 'password', port:process.env.PORT});
  // query database
  const [rows, fields] = await connection.execute(insertDepartment('test-department'));
  console.log(rows, fields);
}

// main();