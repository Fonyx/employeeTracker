const mysql = require('mysql2/promise');
require('dotenv').config();


async function connection(){
    let open_conn = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'employee_db'
    });
    return open_conn;
}


module.exports = connection;