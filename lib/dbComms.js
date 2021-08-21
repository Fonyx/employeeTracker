const connection = require('../db/connection');

// general database commands
const getTables = async() => {
    try{
        let query = "SHOW TABLES";
        let conn = await connection();
        const[rows, _] = await conn.execute(query);
        return rows;
    } catch(err){
        console.error(err);
    }
}

async function getColumnsByTable(tableName){
    let result = ['not Implemented']
    console.log(`Getting columns from table: ${tableName}`);
    return result;
}

module.exports = {
    getTables,
    getColumnsByTable
}