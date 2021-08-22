const connection = require('../db/connection');

/**
 * A function to return all Employees
 * @param {name} string Name of Employee * not this is a uniquely constrained column 
 */
 async function getAllEmployees() {
    let query = 'SELECT first_name, last_name FROM Employee';
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
 * gets the details of an employee from a fullname argument
 * @param {str} fullname contains a joined name of 'first last' name
 * @returns an object
 */
async function getEmployeeDetailsByFullname(fullname){
    let first_name = fullname.split(' ')[0];
    let last_name = fullname.split(' ')[1];
    let query = 'SELECT * FROM employee WHERE first_name = ? && last_name=?';
    console.log(`Getting employee ${fullname} from database`);
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [first_name, last_name]);
        console.log(rows[0]);
    } catch(error){
        console.error(error);
    }
    return rows[0];
}

/**
 * gets all columns of an employee from an id argument
 * @param {str} fullname contains a joined name of 'first last' name
 * @returns an integer
 */
async function getEmployeeDetailsById(id){
    let query = 'SELECT * FROM employee WHERE id = ?';
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
 * A function to add a new Employee with a params object
 * @param {params} classes.Dict  key list and values list
 */
const addEmployeeWithParams = async(params) => {
    try{
        let query = `INSERT INTO employee(${params.get_keys_string()}) VALUES(${params.get_values_as_question_marks()})`;
        // remove quotes from query string
        query.replace("'", "");
        console.log(query);
        // let query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
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
 * @param {employeeId} int the employee id to update
 * @param {newRoleId} int the new role id
 */
async function updateEmployeeRoleById(employeeId, newRoleId) {
    try{
        let query = "UPDATE Employee SET role_id = ? WHERE id = ?";
        console.log(`Updating Employee at id:${employeeId} to ${newRoleId}`)
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [newRoleId, employeeId]);
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
    addEmployeeWithParams,
    deleteEmployeeById,
    getAllEmployees,
    getEmployeeDetailsByFullname,
    getEmployeeDetailsById,
    updateEmployeeNameById,
    updateEmployeeRoleById,
}

module.exports = empComms;