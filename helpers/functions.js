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

/**
 * Function that returns the rows of columns requested
 * @param {List of Binary Row} table 
 * @param {str} str Column to return
 */
function getColumnFromSQLTable(table, column){
    let result = [];
    for(let i =0; i<table.length;i++){
        let current = table[i][column];
        result.push(current);
    }
    return result;
}

module.exports = {
    tablePrint,
    sanitizeErrorForUser,
    getColumnFromSQLTable,
}