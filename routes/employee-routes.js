const express = require('express');
const employeeRouter = express.Router();
const dbModels = require('../models/index');

employeeRouter.get('/all', (req, res) => {
    dbModels.Employee.findAll().then(employees => res.send(employees));
});

employeeRouter.post('/new', (req, res) => {
    let department = dbModels.Department.create(req.body)
    .then(newDept => {
        console.log(newDept);
    });
    let role = dbModels.Role.create({
        title: 'test-role',
        salary: 80000,
        departmentId:department.id
    }).then(newRole => {
        console.log(newRole);
    });
    dbModels.Employee.create({
        first_name:'test-first',
        last_name: 'test-last-name',
        roleId: role.id,
        managerId: null
    }).then(newEmployee => res.send(newEmployee));
});


module.exports = employeeRouter;