const comms = require('./helpers/comms');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();



async function main(){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    await comms.addDepartmentByName(connection, "first department");
    await comms.addDepartmentByName(connection, "second department");
    await comms.updateDepartmentNameById(connection, 1, "updated-name");
    await comms.deleteDepartmentById(connection, 2);
    await comms.getAllDepartments(connection);
}

main();
