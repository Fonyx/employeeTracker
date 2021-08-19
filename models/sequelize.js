const Sequelize = require('sequelize');
const EmployeeModel = require('./employee');
const RoleModel = require('./role');
const DepartmentModel = require('./department');

// database connection
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
const Role = RoleModel(sequelize, Sequelize);
const Department = DepartmentModel(sequelize, Sequelize);


// relationships with simple foreign keys
// Employee relationship to Manager
Employee.belongsTo(Employee, { as: 'employee', foreignKey: 'managerId'});
// A role has many employees
Role.hasMany(Employee, { as: 'role', foreignKey: 'roleId'});
// A department has many roles
Department.hasMany(Role, { as: 'department', foreignKey: 'departmentId'});

sequelize.sync({force: false}).then(()=>{
    console.log('Database structure built');
})

module.exports = {
    Employee, 
    Role, 
    Department
}