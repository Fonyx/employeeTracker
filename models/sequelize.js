const Sequelize = require('sequelize');
const EmployeeModel = require('./employee');
const RoleModel = require('./role');
const DepartmentModel = require('./department');
require('dotenv').config();

const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

// create an Employee, Role and Department Instance to then build associations
const Employee = EmployeeModel(sequelize, Sequelize);
const Manager = EmployeeModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);

// Create sequelized link for foreign keys
const ManagerEmployees = sequelize.define('managers_employees', {});
const RoleEmployees = sequelize.define('roles_employees', {});
const DepartmentRoles = sequelize.define('department_roles', {});

// describe the link type and details
// the manager has many employees
Manager.belongsToMany(Employee, { through: ManagerEmployees, unique: false});
// A role has many employees
Role.belongsToMany(Employee, { through: RoleEmployees, unique: false});
// A department has many roles
Department.belongsToMany(Role, { through: DepartmentRoles, unique: false});

sequelize.sync({force: true}).then(()=>{
    console.log('Database structure built');
})

module.exports = {
    Employee, 
    Role, 
    Department
}