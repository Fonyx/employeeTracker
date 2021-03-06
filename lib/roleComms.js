const connection = require('../db/connection');

/**
 * A function to return all roles
 * @param {name} string Name of role * not this is a uniquely constrained column 
 */
async function getAllRoleDetails() {
    let query = 'SELECT r.id, title, d.name, salary from role r join department d on d.id = r.department_id ORDER BY id ASC;';
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
 * A function to return all roles
 * @param {name} string Name of role * not this is a uniquely constrained column 
 */
async function getAllRoleTitles() {
    let query = 'SELECT title FROM role ORDER BY id ASC';
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
 * gets the id of a role from a role title argument
 * @param {str} title 
 * @returns 
 */
async function getRoleIdByName(title){
    let query = 'SELECT id FROM role WHERE title = ?';
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [title]);
    } catch(error){
        console.error(error);
    }
    return rows[0].id;
}

/**
 * gets the details of a role from a role title argument
 * @param {str} title 
 * @returns string
 */
async function getRoleByTitle(title){
    let query = 'SELECT * FROM role WHERE title = ?';
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [title]);
    } catch(error){
        console.error(error);
    }
    return rows[0];
}

/**
 * gets the name of a role from a role title argument
 * @param {str} title 
 * @returns 
 */
async function getRoleNameById(id){
    let query = 'SELECT title FROM role WHERE id = ?';
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [id]);
    } catch(error){
        console.error(error);
    }
    return rows[0];
}

/**
 * gets the name of a role from a role title argument
 * @param {str} title 
 * @returns 
 */
async function getRoleById(id){
    let query = 'SELECT * FROM role WHERE id = ?';
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [id]);
    } catch(error){
        console.error(error);
    }
    return rows[0];
}

/**
 * A function to add a new role with a given name
 * @param {params} fake_dict_obj contains keys,values  [title, salary, department_id],[str, int, int]
 */
async function  addRoleWithParams(params) {
    let query = 'INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)';
    let conn = await connection();
    const[rows, _] = await conn.execute(query, params.values);
    return rows;
}


/**
 * @param {id} int the id of the target row to update
 * @param {newName} string the new name to update to
 */
async function  updateRoleNameById(id, newName) {
    try{
        let query = "UPDATE role SET name = ? WHERE id = ?";
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
async function  deleteRoleById(id) {
    try{
        let query = "DELETE FROM role WHERE id =?";
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [id]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

const roleComms = {
    deleteRoleById,
    getAllRoleDetails,
    getAllRoleTitles,
    getRoleIdByName,
    getRoleById,
    getRoleByTitle,
    getRoleNameById,
    addRoleWithParams,
    updateRoleNameById,
}

module.exports = roleComms;