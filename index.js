require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');
const depComms = require('./lib/depComms');
const roleComms = require('./lib/roleComms');
const empComms = require('./lib/empComms');
const dbComms = require('./lib/dbComms');
const {confirmStringValidator, confirmIntValidator} = require('./helpers/validators');

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
 * @param {mysql.connection} connection 
 * @returns None
 */
async function viewPrompt(){
    let tables = comms.getTables();
    return inquirer.prompt([{
        type: 'list',
        message: 'Which table would you like to view',
        name: 'table',
        choices: tables
    }]).then(async (answer) => {
        viewTablePrompt(connection, answer.table);
    })
}

/**
 * Determines the view mode the user wants, then calls viewTableHow Prompt
 * @param {mysql.connection} connection 
 * @returns None
 */
async function viewTablePrompt(tableName){
    let tables = dbComms.getTables();
    return inquirer.prompt([{
        type: 'list',
        message: `How would you like to view ${tableName}`,
        name: 'how',
        choices: tables
    }]).then(async (answer) => {
        viewTableHow(answer.how);
    })
}

async function updatePrompt(){
    console.log('View promp sequence');
    
}
async function addPrompt(){
    console.log('View promp sequence');
    
}
async function deletePrompt(){
    console.log('View promp sequence');
    
}


async function addDepartmentPrompt(){
    // add a department
    await inquirer.prompt({
        type: 'input',
        message: 'Name of department?',
        validate: confirmStringValidator,
        name: 'departmentName',
    }).then(async (answer) => {
        await depComms.addDepartmentByName(connection, answer.departmentName);
        resultTable = await comms.getAllDepartments();
        console.table(resultTable);
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

async function rootPromptUser(){
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
        console.log(answer);
        switch (answer.rootAction){
            case 'view all departments':{
                resultTable = await depComms.getAllDepartments();
                console.table(resultTable);
                break
            }
            case 'view all roles': {
                resultTable = await roleComms.getAllRoles();
                console.table(resultTable);
                break
            }
            case 'view all employees': {
                reaultTable = await empComms.getAllEmployees();
                console.table(resultTable);
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
        rootPromptUser()
    }).catch((err) => {
        console.error(err);
    })
}

rootPromptUser();
