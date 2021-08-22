const connection = require('../db/connection');

/**
 * A function to return all roles
 * @param {name} string Name of role * not this is a uniquely constrained column 
 */
 async function getAllRoles() {
    let query = 'SELECT title FROM role';
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
 * gets the id of a role from a role title argument
 * @param {str} title 
 * @returns 
 */
 async function getRoleIdByName(title){
    let query = 'SELECT id FROM role WHERE title = ?';
    console.log(`Getting employee ${title} from database`);
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [title]);
        console.log(rows[0].id);
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
    console.log(`Getting employee ${title} from database`);
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [title]);
        console.log(rows[0]);
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
    console.log(`Getting employee id:${id} from database`);
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [id]);
        console.log(rows[0]);
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
    console.log(`Getting employee id:${id} from database`);
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [id]);
        console.log(rows[0]);
    } catch(error){
        console.error(error);
    }
    return rows[0];
}

/**
 * A function to add a new role with a given name
 * @param {params} fake_dict_obj contains keys,values  [title, salary, department_id],[str, int, int]
 */
const addRoleWithParams = async(params) => {
    try{
        let query = 'INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)';
        let conn = await connection();
        const[rows, _] = await conn.execute(query, params.values);
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
 * Change an employee role with an id and a new role name
 * @param {int} id  
 * @param {str} role_title 
 */
async function updateEmployeeRoleTitleById(id, rol){

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
    deleteRoleById,
    getAllRoles,
    getRoleIdByName,
    getRoleById,
    getRoleByTitle,
    getRoleNameById,
    addRoleWithParams,
    updateRoleNameById,
}

module.exports = roleComms;