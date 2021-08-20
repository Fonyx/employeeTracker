const comms = require('./helpers/comms');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
require('dotenv').config();



async function main(){
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    let resultTable;

    resultTable = await comms.addDepartmentByName(connection, "first department");
    console.table(resultTable);
    resultTable = await comms.addDepartmentByName(connection, "second department");
    console.table(resultTable);
    resultTable = await comms.updateDepartmentNameById(connection, 1, "updated-name");
    console.table(resultTable);
    resultTable = await comms.deleteDepartmentById(connection, 2);
    console.table(resultTable);
    resultTable = await comms.getAllDepartments(connection);
    console.table(resultTable);
}

main();
