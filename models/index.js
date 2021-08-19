const {Employee, Role, Department} = require('./sequelize');

const dbModels = {};

dbModels.Employee = Employee;
dbModels.Role = Role;
dbModels.Department = Department;

module.exports = dbModels;