const mysql = require('mysql2/promise');
const cTable = require('console.table');

// department commands
const getAllDepartments = async (connection) => {
    try{
        let query = 'SELECT * FROM department';
        console.log('Getting all departments from database');
        const[rows, fields] = await connection.execute(query);
        console.table(rows);
    } catch(error){
        console.error(error);
    }
}

const addDepartment = async(connection, params) => {
    try{
        let query = 'INSERT INTO department(name) VALUES(?)';
        console.log(`Adding department ${params.name} to db`)
        const[rows, fields] = await connection.execute(query, [params.name]);
        console.table(rows);
    } catch(err){
        console.error(err);
    }
}


// role commands

// employee commands

const comms = {
    getAllDepartments,
    addDepartment,
}

module.exports = comms