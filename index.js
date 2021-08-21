require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const depComms = require('./lib/depComms');
const roleComms = require('./lib/roleComms');
const empComms = require('./lib/empComms');
const dbComms = require('./lib/dbComms');
const {confirmStringValidator, confirmIntValidator} = require('./helpers/validators');
const {Dict} = require('./helpers/classes');
const {tablePrint, sanitizeErrorForUser} = require('./helpers/functions');

async function specificPrompt(){
    return inquirer.prompt([{
        type: 'rawlist',
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

async function updatePrompt(){
    console.log('View prompt sequence');
    
}

async function addPrompt(){
    console.log('Add prompt sequence');
    
}

async function deletePrompt(){
    console.log('Delete prompt sequence');
    
}

async function addDepartmentPrompt(){
    // add a department
    await inquirer.prompt({
        type: 'input',
        message: 'Name of department?',
        validate: confirmStringValidator,
        name: 'departmentName',
    }).then(async (answer) => {
        await depComms.addDepartmentByName(answer.departmentName);
        tablePrint(await depComms.getAllDepartments());
    }).catch((err) => {
        sanitizeErrorForUser(err);
    })
}

async function addRolePrompt(){
    // add a department
    let departments = await depComms.getAllDepartments();
    await inquirer.prompt([
        {
            type: 'input',
            message: 'Role title?',
            validate: confirmStringValidator,
            name: 'title',
        },{
            type: 'input',
            message: 'Role salary?',
            validate: confirmIntValidator,
            name: 'salary',
        },{
            type: 'rawlist',
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

async function updateEmployeePrompt(){
    // query for office number then append answer to baseAnswers
    await inquirer.prompt({
        type: 'rawlist',
        message: 'What do you want to update?',
        choices:['first name', 'last name', 'role','manager'],
        name: 'updateType',
    })
    .then(async (answer) => {
        switch (answer.updateType){
            case 'first name': {
                console.log('updating first name');
                break
            }
            case 'last name': {
                console.log('updating last name');
                break
            }
            case 'role': {
                console.log('updating role');
                break
            }
            case 'manager': {
                console.log('updating manager');
                break
            }  
        }
    })
    .catch((err) =>{
        console.error(err);
    })
}

async function prompt(){
    inquirer.prompt([{
        type: 'rawlist',
        message: 'What would you like to do',
        name: 'rootAction',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee',
            new inquirer.Separator(),
            'more specific commands',
            new inquirer.Separator(),
            'exit employee cms shell'
        ]
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
            case 'update an employee': {
                await updateEmployeePrompt();
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
