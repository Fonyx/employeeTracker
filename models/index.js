const { serialize } = require('jest-serializer');
const {Employee, Role, Department} = require('./sequelize');

const db = {};

db.serialize = serialize;
db.Serialize = Serialize;

db.Employee = Employee;
db.Role = Role;
db.Department = Department;

module.exports = db;