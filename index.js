require('dotenv').config();
const inquirer = require('inquirer');
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
        name: 'action',
        choices: [
            'view department budgets',
            'view employees by department',
            'view employees by manager',
            'update employee manager',
            '!enter delete mode!',
            'Exit Specific Menu',
        ]
    }]).then(async (answer) => {
        switch (answer.action){
            case 'view department budgets': {
                tablePrint(await depComms.getDepartmentBudgets());
                await specificPrompt();
                break
            }
            case 'view employees by department': {
                tablePrint(await empComms.getEmployeesByDepartment());
                await specificPrompt();
                break
            }
            case 'view employees by manager': {
                tablePrint(await empComms.getEmployeesByManager());
                await specificPrompt();
                break
            }
            case 'update employee manager': {
                await specificUpdatePrompt();
                await specificPrompt();
                break
            }
            case '!enter delete mode!': {
                console.log('\x1b[31m%s', 'Entering Delete Mode, be careful');
                await deletePrompt();
                await specificPrompt();
                break
            }
            case 'Exit Specific Menu':{
                return
            }
        }
    }).then().catch((error) => {
        console.error(error);
    })
}

/**
 * function that gets employee of concern for employee manager update
 */
async function specificUpdatePrompt(){
    let employees = await empComms.getAllEmployeeNames();
    let employeeNames = employees.map((parameter) => {
        return parameter.first_name + ' ' + parameter.last_name;
    });
    await inquirer.prompt({
        type:'list',
        message: 'Which employee do you want to change manager for?',
        name: 'employee',
        choices: employeeNames,
        pageSize: 15
    }).then(async (answer) => {
        await specificUpdateEmployeePrompt(answer.employee);
    }).catch((error)=>{
        console.error(error);
    })
}

async function specificUpdateEmployeePrompt(employeeName){
    let currentEmployeeDetails = await empComms.getEmployeeDetailsByFullname(employeeName);
    let allEmployees = await empComms.getAllEmployeeNames();
    let allEmployeeNames = allEmployees.map((parameter) => {
        return parameter.first_name + ' ' + parameter.last_name;
    });
    let currentManager = await empComms.getEmployeeDetailsById(currentEmployeeDetails.manager_id);
    let currentManagerName = currentManager.first_name.concat(' ', currentManager.last_name);
    let possibleManagers = [];
    // remove current employee and current manager from list of employees
    for(let i = 0; i<allEmployeeNames.length; i++){
        let name = allEmployeeNames[i];
        if(name !== employeeName && name !== currentManagerName){
            possibleManagers.push(name);
        }
    }
    await inquirer.prompt({
        type:'list',
        message:'Who is the new manager',
        name:'newManager',
        choices: possibleManagers,
        pageSize: 12
    }).then(async (answer)=>{
        let managerDetails = await empComms.getEmployeeDetailsByFullname(answer.newManager);
        await empComms.updateEmployeeManager(currentEmployeeDetails.id, managerDetails.id);
    }).catch((err)=>{
        console.log(err)
    })
}

async function deletePrompt(){
    await inquirer.prompt({
       type: 'list',
       message: 'What would you like to delete?',
       name: 'table',
       choices: ['department', 'role', 'employee', 'exit delete mode'],
    }).then(async (answers)=>{
        if(answers.table !== 'exit delete mode'){
            switch (answers.table){
                case 'department': {
                    await deleteFromDepartmentPrompt();
                    await deletePrompt();
                    break
                }
                case 'role': {
                    await deleteFromRolePrompt();
                    await deletePrompt();
                    break
                }
                case 'employee': {
                    await deleteFromEmployeePrompt();
                    await deletePrompt();
                    break
                }
            }
        } else {
            console.log('\x1b[30m%s', 'Exiting Delete Mode')
            return
        }
    }).catch((error) =>{
        console.log(error);
    });
}

async function deleteFromDepartmentPrompt(){
    tablePrint(await depComms.getAllDepartments());
    await inquirer.prompt({
        type: 'input',
        message: 'id of item to delete?',
        name: 'id',
        validate: validators.confirmIntValidator,
        pageSize: 15,
    }).then(async (answer) => {
        await depComms.deleteDepartmentById(answer.id);
    }).catch((error)=>{console.log(error)});
}

async function deleteFromRolePrompt(){
    tablePrint(await roleComms.getAllRoleDetails());
    await inquirer.prompt({
        type: 'input',
        message: 'id of item to delete?',
        name: 'id',
        validate: validators.confirmIntValidator,
        pageSize: 15,
    }).then( async (answer) => {
        await roleComms.deleteRoleById(answer.id);
    }).catch((error)=>{console.log(error)});
}

async function deleteFromEmployeePrompt(){
    tablePrint(await empComms.getAllEmployeeDetails());
    await inquirer.prompt({
        type: 'input',
        message: 'id of item to delete?',
        name: 'id',
        validate: validators.confirmIntValidator,
        pageSize: 15,
    }).then(async (answer) => {
        await empComms.deleteEmployeeById(answer.id);
    }).catch((error)=>{console.log(error)});
}

async function addEmployeePrompt(){
    // add a department
    let employees = await empComms.getAllEmployeeNames();
    let employeeNames = employees.map((parameter) => {
        return parameter.first_name + ' ' + parameter.last_name;
    })

    let roles = await roleComms.getAllRoleTitles();
    let roleNames = roles.map((parameter) => {
        return parameter.title;
    })
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
            pageSize: 15,
        },{
            type: 'list',
            message: 'Manager?',
            name: 'managerName',
            choices: employeeNames,
            when: () => {
                if(employeeNames.length > 0){
                    return true;
                } else {
                    return false
                }
            },
            pageSize: 15,
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
            let managerDetails = await empComms.getEmployeeDetailsByFullname(answers.managerName);
            paramsDict.set('manager_id', managerDetails.id);
        }
        await empComms.addEmployeeWithParams(paramsDict);
        resultTable = await roleComms.getAllRoleTitles();
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
            pageSize: 15,
        }
    ]).then(async (answers) => {
        let department_id = await depComms.getDepartmentIdByName(answers.department);
        let paramsDict = new Dict(
            ['title', 'salary', 'department_id'], 
            [answers.title, answers.salary, department_id]
        );
        await roleComms.addRoleWithParams(paramsDict);
        resultTable = await roleComms.getAllRoleTitles();
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
        pageSize: 15,
    }).then(async (answer) => {
        await depComms.addDepartmentByName(answer.departmentName);
        tablePrint(await depComms.getAllDepartments());
    }).catch((err) => {
        sanitizeErrorForUser(err);
    })
}

async function updateEmployeeRolePrompt(){
    // query for office number then append answer to baseAnswers
    let employees = await empComms.getAllEmployeeNames();
    let employeeNames = employees.map((parameter) => {
        return parameter.first_name + ' ' + parameter.last_name;
    });
    await inquirer.prompt([{
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: employeeNames,
        name: 'employee',
        pageSize: 15
    }])
    .then(async (answer) => {
        await updateEmployeeRoleToPrompt(answer.employee);
    })
    .catch((err) =>{
        console.error(err);
    })
}

async function updateEmployeeRoleToPrompt(employeeName){
    let employeeDetails = await empComms.getEmployeeDetailsByFullname(employeeName);
    let currentRole = await roleComms.getRoleById(employeeDetails.id);

    let roles = await roleComms.getAllRoleTitles();
    let roleNames = [];
    // make standard array of titles - remove current title from choices
    for(let i =0; i<roles.length; i++){
        let roleName = roles[i].title;
        if(roleName !== currentRole.title){
            roleNames.push(roleName);
        }
    }
    await inquirer.prompt({
        type: 'list',
        message: 'What is their new role?',
        choices: roleNames,
        name: 'role',
        pageSize: 15,
    }).then(async (answer)=>{
        let newRole = await roleComms.getRoleByTitle(answer.role);
        await empComms.updateEmployeeRoleById(employeeDetails.id, newRole.id);
        tablePrint(await empComms.getEmployeeDetailsById(employeeDetails.id));
    }).catch((err) => {
        console.error(err);
    })
}

async function getPossibleRootPromptChoices(){
    let departments = await depComms.getAllDepartments();
    let roles = await roleComms.getAllRoleTitles();
    let employees = await empComms.getAllEmployeeNames();
    let choices = [
        'add a department'
    ];
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
    choices.push(new inquirer.Separator(), 'exit employee cms shell',new inquirer.Separator())
    return choices;
}

async function prompt(){
    let currentChoices = await getPossibleRootPromptChoices();
    await inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do',
        name: 'rootAction',
        choices: currentChoices,
        pageSize: 15
    }]).then(async (answer) => {
        switch (answer.rootAction){
            case 'view all departments':{
                tablePrint(await depComms.getAllDepartments());
                await prompt();
                break
            }
            case 'view all roles': {
                resultTable = await roleComms.getAllRoleDetails();
                tablePrint(resultTable);
                await prompt();
                break
            }
            case 'view all employees': {
                tablePrint(await empComms.getAllEmployeeDetails())
                await prompt();
                break
            }
            case 'add a department': {
                await addDepartmentPrompt();
                await prompt();
                break
            }
            case 'add a role': {
                await addRolePrompt();
                await prompt();
                break
            }
            case 'add an employee': {
                await addEmployeePrompt();
                await prompt();
                break
            }
            case "update an employee's role": {
                await updateEmployeeRolePrompt();
                await prompt();
                break
            }
            case 'more specific commands': {
                await specificPrompt();
                await prompt();
                break
            }
            case 'exit employee cms shell':{
                console.log('Exiting');
                break
            }
        }
    }).then(()=>{
    }).catch((err) => {
        console.error(err);
    })
}

prompt();