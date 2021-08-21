const connection = require('../db/connection');

/**
 * A function to return all roles
 * @param {name} string Name of role * not this is a uniquely constrained column 
 */
 async function getAllRoles() {
    let query = 'SELECT * FROM role';
    console.log('Getting all roles from database');
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
 * A function to add a new role with a given name
 * @param {params} fake_dict_obj contains keys,values  [title, salary, department_id],[str, int, int]
 */
const addRoleWithParams = async(params) => {
    try{
        let query = 'INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)';
        console.log(`Adding role ${params.keys[0]} with ${params.keys[2]} and ${params.keys[1]} to db`);
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [params.values]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

/**
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
const updateRoleNameById = async(id, newName) => {
    try{
        let query = "UPDATE role SET name = ? WHERE id = ?";
        console.log(`Updating role at id:${id} to ${newName}`)
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
const deleteRoleById = async(id) => {
    try{
        let query = "DELETE FROM role WHERE id =?";
        console.log(`Deleting role at id:${id}`)
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

const roleComms = {
    getAllRoles,
    addRoleByName: addRoleWithParams,
    updateRoleNameById,
    deleteRoleById,
}

module.exports = roleComms;