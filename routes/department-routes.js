const express = require('express');
const departmentRouter = express.Router();
const dbModels = require('../models/index');

departmentRouter.get('/all', (req, res) => {
    dbModels.Department.findAll().then(departments => res.send(departments));
});

departmentRouter.post('/new', (req, res) => {
    dbModels.Department.create(req.body).then(newDepartment => res.send(newDepartment));
})

module.exports = departmentRouter;