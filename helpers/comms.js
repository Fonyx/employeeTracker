const mysql = require('mysql2/promise');

// department commands
/**
 * A function to return all departments
 * @param {mysql.connection} connection 
 * @param {name} string Name of department * not this is a uniquely constrained column 
 */
const getAllDepartments = async (connection) => {
    let query = 'SELECT * FROM department';
    console.log('Getting all departments from database');

    try{
        const[rows, _] = await connection.execute(query);
        return rows;
    } catch(error){
        console.error(error);
    }

}

/**
 * A function to add a new department with a given name
 * @param {mysql.connection} connection 
 * @param {name} string Name of department * not this is a uniquely constrained column 
 */
const addDepartmentByName = async(connection, name) => {
    try{
        let query = 'INSERT INTO department(name) VALUES(?)';
        console.log(`Adding department ${name} to db`);
        const[rows, _] = await connection.execute(query, [name]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

/**
 * 
 * @param {mysql.connection} connection 
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
const updateDepartmentNameById = async(connection, id, newName) => {
    try{
        let query = "UPDATE department SET name = ? WHERE id = ?";
        console.log(`Updating department at id:${id} to ${newName}`)
        const[rows, _] = await connection.execute(query, [newName, id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}


/**
 * 
 * @param {mysql.connection} connection 
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
const deleteDepartmentById = async(connection, id) => {
    try{
        let query = "DELETE FROM department WHERE id =?";
        console.log(`Deleting department at id:${id}`)
        const[rows, _] = await connection.execute(query, [id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}



// role commands

// employee commands

const comms = {
    getAllDepartments,
    addDepartmentByName,
    updateDepartmentNameById,
    deleteDepartmentById,
}

module.exports = comms