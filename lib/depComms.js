const connection = require('../db/connection');


// department commands
/**
 * A function to return a specific department when given name
 * @param {name} string Name of department * not this is a uniquely constrained column 
 */
async function getDepartmentIdByName(name) {
    let query = 'SELECT id FROM department WHERE name = ?';
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [name]);
    } catch(error){
        console.error(error);
    }
    return rows[0].id;
}
/**
 * A function to return all departments
 * @param {name} string Name of department * not this is a uniquely constrained column 
 */
async function getAllDepartments() {
    let query = 'SELECT * FROM department';
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
 * A function to add a new department with a given name
 * @param {name} string Name of department * not this is a uniquely constrained column 
 * @returns boolean for successful injection or failure
 */
async function addDepartmentByName(name){
    let query = 'INSERT INTO department(name) VALUES(?)';
    let conn = await connection();
    await conn.execute(query, [name]);
}

/**
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
async function  updateDepartmentNameById(id, newName){
    try{
        let query = "UPDATE department SET name = ? WHERE id = ?";
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [newName, id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

async function getDepartmentBudgets(){
    try{
        let query = ``;
        let conn = await connection();
        let[rows, _] = await conn.execute(query)
    } catch(error){
        console.error(error);
    }
}

/**
 * 
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
async function  deleteDepartmentById(id){
    try{
        let query = "DELETE FROM department WHERE id =?";
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

const depComms = {
    getDepartmentIdByName,
    getAllDepartments,
    addDepartmentByName,
    updateDepartmentNameById,
    deleteDepartmentById,
}

module.exports = depComms;