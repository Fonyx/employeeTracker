const express = require('express');
const departmentRouter = express.Router();
const dbModels = require('../models/index');

departmentRouter.post('/new', (req, res) => {
    dbModels.Department.create(req.body).then(newDepartment => res.send(newDepartment));
})

module.exports = departmentRouter;