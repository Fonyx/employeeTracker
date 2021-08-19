const express = require('express');
const employeeRouter = require('./employee-routes');
const roleRouter = require('./role-routes');
const departmentRouter = require('./department-routes');

const app = express();

app.use('/employee', employeeRouter);
app.use('/role', roleRouter);
app.use('/department', departmentRouter);

module.exports = app;