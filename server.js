const express = require('express');
const sequelize = require('./config/connection');
// const db = require('./models/index');

const app = express();
const PORT = process.env.PORT || 3001;
const Employee = require('./models/employee');
const Role = require('./models/role');
const Department = require('./models/department');

// Associations
// Employee.hasOne(Role);
// Role.hasOne(Department);

// setup connection to database
sequelize.sync({force: true}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});