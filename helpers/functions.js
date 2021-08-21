const cTable = require('console.table');

function tablePrint(data){
    if(data.length === 0){
        console.log('No entries returned');
    } else{
        let table = cTable.getTable(data);
        console.log(table);
    }
}

function sanitizeErrorForUser(error){
    if(error.message.includes('Duplicate')){
        console.log('That entry already exists');
    }
}

module.exports = {
    tablePrint,
    sanitizeErrorForUser,
}