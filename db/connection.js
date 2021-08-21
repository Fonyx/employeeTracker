const mysql = require('mysql2/promise');


async function connection(){
    let open_conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    return open_conn;
}


module.exports = connection;