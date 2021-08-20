const mysql = require('mysql2/promise');
const cTable = require('console.table');

// department commands
const getAllDepartments = async (connection) => {
    let query = 'SELECT * FROM department';
    console.log('Getting all departments from database');

    try{
        const[rows, _] = await connection.execute(query);
        console.table(rows);
    } catch(error){
        console.error(error);
    }

}

const addDepartment = async(connection, params) => {
    try{
        let query = 'INSERT INTO department(name) VALUES(?)';
        console.log(`Adding department ${params.name} to db`)
        const[rows, _] = await connection.execute(query, [params.name]);
        console.table(rows);
    } catch(err){
        console.error(err);
    }
}

/**
 * SQL wrapper function acting on a connection to update the department table
 * @param {mysql.connection} connection 
 * @param {updates:[{key, value},]} updates list of key value pairs
 * @param {condition:{key, value}} params key value conditional
 */
const updateDepartmentMultiple = async(connection, updates, conditions) => {
    console.log(updates);
    for(let update of updates){
        console.log(update);
        let parameterNames = Object.keys(update);
        parameterNames.forEach((parameter) => {
            let value = update[parameter];
            console.log(parameter);
            console.log(value);
        })
    }
    // try{
    //     let query = 'UPDATE department SET ? = ? WHERE ? = ?';
    //     console.log(`Updating department ${params.name} to db`)
    //     const[rows, _] = await connection.execute(query, [params.name]);
    //     console.table(rows);
    // } catch(err){
    //     console.error(err);
    // }
}

/**
 * 
 * @param {*} connection 
 * @param {*} params 
 */
const updateDepartment = async(connection, id, newName) => {
    try{
        let query = "UPDATE department SET name = ? WHERE id = ?";
        console.log(`Updating department at id:${id} to ${newName}`)
        const[rows, _] = await connection.execute(query, [newName, id]);
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
    updateDepartment,
}

module.exports = comms