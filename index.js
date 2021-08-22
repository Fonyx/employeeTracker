require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const depComms = require('./lib/depComms');
const roleComms = require('./lib/roleComms');
const empComms = require('./lib/empComms');
const dbComms = require('./lib/dbComms');
const { validators } = require('./helpers/validators');
const {Dict} = require('./helpers/classes');
const {tablePrint, sanitizeErrorForUser} = require('./helpers/functions');

async function specificPrompt(){
    return inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do',
        name: 'rootAction',
        choices: [
            'view',
            'update',
            'add',
            'delete',
        ]
    }]).then(async (answer) => {
        switch (answer.rootAction){
            case 'view': {
                viewPrompt();
                break
            }
            case 'update': {
                updatePrompt();
                break
            }
            case 'add': {
                addPrompt();
                break
            }
            case 'delete': {
                deletePrompt();
                break
            }
        }
    })
}

/**
 * Determines the table the user wants to view, then calls viewTable Prompt
 * @returns None
 */
async function viewPrompt(){
    let tables = dbComms.getTables();
    return inquirer.prompt([{
        type: 'list',
        message: 'Which table would you like to view',
        name: 'table',
        choices: tables
    }]).then(async (answer) => {
        console.log(`view ${tableName}`);
        viewTablePrompt(answer.table);
    })
}

/**
 * asks user for view columns on table provided, then calls viewTableHow Prompt
 * @param {str} tableName a string table name to view 
 * @returns None
 */
async function viewTablePrompt(tableName){
    let columns = dbComms.getColumnsByTable(tableName);
    // make unquirer compatible list of names and set their check default to true
    let columnNames = columns.map((parameter) => {
        return `name: ${parameter}, checked=${true}`;
    })
    return inquirer.prompt([{
        type: 'checkbox',
        message: `Which columns would you like to view?`,
        name: 'columns',
        choices: columnNames,
    }]).then(async (answer) => {
        console.log(`view ${tableName} columns: ${answer.columns}`);
        viewTableColumns(tableName, answer.columns);
    })
}

async function viewTableColumns(tableName, columns){
    if (columns === 'all'){

    }else{

    }
}

async function addPrompt(){
    console.log('Add prompt sequence');
    
}

async function updatePrompt(){
    console.log('View prompt sequence');
    
}

async function deletePrompt(){
    console.log('Delete prompt sequence');
    
}

async function addEmployeePrompt(){
    // add a department
    let employees = await empComms.getAllEmployees();
    let employeeNames = employees.map((parameter) => {
        return parameter.first_name + ' ' + parameter.last_name;
    })
    console.log(employeeNames);

    let roles = await roleComms.getAllRoles();
    let roleNames = roles.map((parameter) => {
        return parameter.title;
    })
    console.log(roleNames);
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Employee first name?',
            validate: validators.confirmStringNoSpaceValidator,
            name: 'firstName',
        },{
            type: 'input',
            message: 'Employee last name?',
            validate: validators.confirmStringNoSpaceValidator,
            name: 'lastName',
        },{
            type: 'list',
            message: 'Role?',
            name: 'roleName',
            choices: roleNames,
        },{
            type: 'list',
            message: 'Manager?',
            name: 'managerName',
            choices: employeeNames,
            when: () => {
                console.log(employeeNames);
                if(employeeNames.length > 0){
                    return true;
                } else {
                    return false
                }
            },
        }
    ]).then(async (answers) => {
        // get the role id for the name chosen
        let roleId = await roleComms.getRoleIdByName(answers.roleName);
        // build basic params object, omitting manager
        let paramsDict = new Dict(
            ['first_name', 'last_name', 'role_id'], 
            [answers.firstName, answers.lastName, roleId]
        );
        // if there is a manager, add it to the params dictionary
        if(answers.managerName){
            let managerId = await empComms.getEmployeeIdByName(answers.managerName);
            paramsDict.set('manager_id', managerId);
        }
        await empComms.addEmployeeWithParams(paramsDict);
        resultTable = await roleComms.getAllRoles();
        tablePrint(resultTable);
    }).catch((err) => {
        console.error(err);
    })
}

async function addRolePrompt(){
    // add a department
    let departments = await depComms.getAllDepartments();
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Role title?',
            validate: validators.confirmStringValidator,
            name: 'title',
        },{
            type: 'input',
            message: 'Role salary?',
            validate: validators.confirmIntValidator,
            name: 'salary',
        },{
            type: 'list',
            message: 'Role department?',
            name: 'department',
            choices: departments,
        }
    ]).then(async (answers) => {
        let department_id = await depComms.getDepartmentIdByName(answers.department);
        let paramsDict = new Dict(
            ['title', 'salary', 'department_id'], 
            [answers.title, answers.salary, department_id]
        );
        await roleComms.addRoleWithParams(paramsDict);
        resultTable = await roleComms.getAllRoles();
        tablePrint(resultTable);
    }).catch((err) => {
        console.error(err);
    })
}

async function addDepartmentPrompt(){
    // add a department
    await inquirer.prompt({
        type: 'input',
        message: 'Name of department?',
        validate: validators.confirmStringValidator,
        name: 'departmentName',
    }).then(async (answer) => {
        await depComms.addDepartmentByName(answer.departmentName);
        tablePrint(await depComms.getAllDepartments());
    }).catch((err) => {
        sanitizeErrorForUser(err);
    })
}

async function updateEmployeeRolePrompt(){
    // query for office number then append answer to baseAnswers
    let employees = await empComms.getAllEmployees();
    let employeeNames = employees.map((parameter) => {
        return parameter.first_name + ' ' + parameter.last_name;
    });
    console.log(employeeNames);

    let roles = await roleComms.getAllRoles();
    let roleNames = roles.map((parameter) => {
        return parameter.title;
    })
    console.log(roleNames);

    await inquirer.prompt([{
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: employeeNames,
        name: 'employee',
    },{
        type: 'list',
        message: 'What is their new role',
        choices: roleNames,
        name: 'role',
    }])
    .then(async (answer) => {
        // if the chosen employee's role
        let employeeDetails = await empComms.getEmployeeDetailsByFullname(answer.employee);
        let currentRole = await roleComms.getRoleById(employeeDetails.id);
        let newRole = await roleComms.getRoleByTitle(answer.role);
        if(currentRole.title !== answer.role){
            // update the role
            await empComms.updateEmployeeRoleById(employeeDetails.id, newRole.id);
            tablePrint(await empComms.getEmployeeDetailsById(employeeDetails.id));
        } else {
            console.log('The user already has that role, try again');
            await updateEmployeeRolePrompt();
        }
    })
    .catch((err) =>{
        console.error(err);
    })
}

async function getPossibleRootPromptChoices(){
    let departments = await depComms.getAllDepartments();
    let roles = await roleComms.getAllRoles();
    let employees = await empComms.getAllEmployees();
    let choices = [
        'add a department'
    ];
    console.log(departments);
    console.log(roles);
    console.log(employees);
    // since you can't add a role without departments
    if(departments.length > 0){
        choices.push('view all departments', 'add a role');
        //  since you can't add an employee without roles
        if(roles.length > 0) {
            choices.push('view all roles','add an employee');
        }
        // since you can't update an employee without employees
        if(employees.length > 0){
            choices.push('view all employees',"update an employee's role", new inquirer.Separator(), 'more specific commands')
        }
    }
    // from the start we sill need exit option, but that goes at the end
    choices.push(new inquirer.Separator(), 'exit employee cms shell')
    return choices;
}

async function prompt(){
    let currentChoices = await getPossibleRootPromptChoices();
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do',
        name: 'rootAction',
        choices: currentChoices
    }]).then(async (answer) => {
        switch (answer.rootAction){
            case 'view all departments':{
                tablePrint(await depComms.getAllDepartments());
                break
            }
            case 'view all roles': {
                resultTable = await roleComms.getAllRoles();
                tablePrint(resultTable);
                break
            }
            case 'view all employees': {
                tablePrint(await empComms.getAllEmployees())
                break
            }
            case 'add a department': {
                await addDepartmentPrompt();
                break
            }
            case 'add a role': {
                await addRolePrompt();
                break
            }
            case 'add an employee': {
                await addEmployeePrompt();
                break
            }
            case "update an employee's role": {
                await updateEmployeeRolePrompt();
                break
            }
            case 'more specific commands': {
                await specificPrompt();
                break
            }
            case 'exit employee cms shell':{
                return
            }
        }
    }).then(()=>{
        prompt()
    }).catch((err) => {
        console.error(err);
    })
}

prompt();
