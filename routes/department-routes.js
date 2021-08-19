const express = require('express');
const departmentRouter = express.Router();
const db = require('../models/index');

departmentRouter.post('/new', (req, res) => {
    db.Department.create(req.body).then(newDepartment => res.send(newDepartment));
})

module.exports = departmentRouter;