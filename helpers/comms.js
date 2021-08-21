const mysql = require('mysql2/promise');


async function connection(){
    let open_conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    return open_conn;
}
    

// department commands
/**
 * A function to return all departments
 * @param {name} string Name of department * not this is a uniquely constrained column 
 */
async function getAllDepartments() {
    let query = 'SELECT * FROM department';
    console.log('Getting all departments from database');
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
 */
const addDepartmentByName = async(name) => {
    try{
        let query = 'INSERT INTO department(name) VALUES(?)';
        console.log(`Adding department ${name} to db`);
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
const updateDepartmentNameById = async(id, newName) => {
    try{
        let query = "UPDATE department SET name = ? WHERE id = ?";
        console.log(`Updating department at id:${id} to ${newName}`)
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
const deleteDepartmentById = async(id) => {
    try{
        let query = "DELETE FROM department WHERE id =?";
        console.log(`Deleting department at id:${id}`)
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

// role commands

// employee commands


// general database commands
const getTables = async() => {
    try{
        let query = "SHOW TABLES";
        let conn = await connection();
        const[rows, _] = await conn.execute(query);
        return rows;
    } catch(err){
        console.error(err);
    }
}

const comms = {
    getAllDepartments,
    addDepartmentByName,
    updateDepartmentNameById,
    deleteDepartmentById,

    // general queries
    getTables,
}

module.exports = comms