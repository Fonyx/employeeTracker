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

    await comms.addDepartment(connection, {name: 'test-department'});
    await comms.getAllDepartments(connection);
    
    // const getAllDepartments = async () => {
    //     let query = `SELECT * FROM department`;
    //     console.log('Getting all departments from database');
    //     const[rows, fields] = await connection.execute(query);
    //     console.table(fields, rows);
    //     return command;
    // }
    // getAllDepartments();
}

main();
