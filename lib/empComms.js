const connection = require('../db/connection');

/**
 * A function to return all Employees
 * @param {name} string Name of Employee * not this is a uniquely constrained column 
 */
 async function getAllEmployees() {
    let query = 'SELECT * FROM Employee';
    console.log('Getting all Employees from database');
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query);
    } catch(error){
        console.error(error);
    }
    return rows;
}

/**
 * A function to add a new Employee with a given name
 * @param {name} string Name of Employee * not this is a uniquely constrained column 
 */
const addEmployeeByName = async(name) => {
    try{
        let query = 'INSERT INTO Employee(name) VALUES(?)';
        console.log(`Adding Employee ${name} to db`);
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [name]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

/**
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
const updateEmployeeNameById = async(id, newName) => {
    try{
        let query = "UPDATE Employee SET name = ? WHERE id = ?";
        console.log(`Updating Employee at id:${id} to ${newName}`)
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [newName, id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}


/**
 * 
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
const deleteEmployeeById = async(id) => {
    try{
        let query = "DELETE FROM Employee WHERE id =?";
        console.log(`Deleting Employee at id:${id}`)
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

const empComms = {
    getAllEmployees,
    addEmployeeByName,
    updateEmployeeNameById,
    deleteEmployeeById,
}

module.exports = empComms;