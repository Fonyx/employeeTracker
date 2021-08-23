const connection = require('../db/connection');

/**
 * A function to return all Employee details with join to department and role
 */
 async function getAllEmployeeDetails() {
    let query = `SELECT
    e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary,
 IFNULL(CONCAT(m.first_name, ' ', m.last_name),
         'LEAD') AS 'Manager'
FROM
 employee e
LEFT JOIN employee m ON
 m.id = e.manager_id
LEFT JOIN role r ON
 r.id = e.role_id
LEFT JOIN department d ON
 d.id = r.department_id
ORDER BY
 id ASC;`;
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
 * A function to return all Employees
 * @param {name} string Name of Employee * not this is a uniquely constrained column 
 */
 async function getAllEmployeeNames() {
    let query = 'SELECT first_name, last_name FROM Employee';
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query);
    } catch(error){
        console.error(error);
    }
    return rows;
}

async function getEmployeesByDepartment(){
    let query = `SELECT d.name AS Department, count(*) as Employees
    FROM employee e
    JOIN role r on r.id = e.role_id
    JOIN department d on d.id = r.department_id
    GROUP BY r.department_id;`;
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query);
    } catch(error){
        console.error(error);
    }
    return rows;
}

async function getEmployeesByManager(){
    let query = `SELECT CONCAT(m.first_name, ' ', m.last_name) AS Manager, count(*) as Employees
    FROM employee e
    JOIN role r on r.id = e.role_id
    JOIN department d on d.id = r.department_id
    JOIN employee m on e.manager_id = m.id
    GROUP BY m.id;`;
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
    let rows = [];
    try{
        let conn = await connection();
        [rows, _] = await conn.execute(query, [first_name, last_name]);
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
 * A function to add a new Employee with a params object
 * @param {params} classes.Dict  key list and values list
 */
async function addEmployeeWithParams(params){
    try{
        let query = `INSERT INTO employee(${params.get_keys_string()}) VALUES(${params.get_values_as_question_marks()})`;
        // remove quotes from query string
        query.replace("'", "");
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
async function updateEmployeeNameById(id, newName){
    try{
        let query = "UPDATE Employee SET name = ? WHERE id = ?";
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
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [newRoleId, employeeId]);
        return rows;
    } catch(err){
        console.error(err);
    }
}

/**
 * @param {employeeId} int the employee id to update
 * @param {newRoleId} int the new role id
 */
async function updateEmployeeManager(emp_id, man_id) {
    try{
        let query = "UPDATE Employee SET manager_id = ? WHERE id = ?";
        let conn = await connection();
        const[rows, _] = await conn.execute(query, [man_id, emp_id]);
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
async function deleteEmployeeById(id){
    try{
        let query = "DELETE FROM Employee WHERE id =?";
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
    getEmployeesByDepartment,
    getEmployeesByManager,
    getAllEmployeeDetails,
    getAllEmployeeNames,
    getEmployeeDetailsByFullname,
    getEmployeeDetailsById,
    updateEmployeeNameById,
    updateEmployeeRoleById,
    updateEmployeeManager,
}

module.exports = empComms;