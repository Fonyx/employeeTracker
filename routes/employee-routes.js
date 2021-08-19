const express = require('express');
const employeeRouter = express.Router();
const dbModels = require('../models/index');

employeeRouter.get('/all', (req, res) => {
    dbModels.Employee.findAll().then(employees => res.send(employees));
});

employeeRouter.post('/new', (req, res) => {
    dbModels.Employee.create(req.body).then(newEmployee => res.send(newEmployee));
});


module.exports = employeeRouter;