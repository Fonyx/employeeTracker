
const insertDepartment = (name) => {
    let command = `INSERT INTO department(name) VALUES(${name})`;
    console.log('trying');
    return command;
}


module.exports = {
    insertDepartment,
}