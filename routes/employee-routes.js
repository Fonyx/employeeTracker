const express = require('express');
const employeeRouter = express.Router();
const db = require('../models/index');

employeeRouter.get('/all', (req, res) => {
    db.Employee.findAll().then(employees => res.send(employees));
});

employeeRouter.post('/new', (req, res) => {
    db.Employee.create(req.body).then(newEmployee => res.send(newEmployee));
});


module.exports = employeeRouter;