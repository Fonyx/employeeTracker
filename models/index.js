const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);
const db = {
    Employee: sequelize.import('./employee'),
    Role: sequelize.import('./role'),
    Department: sequelize.import('./department'),
}
db.sequelize = sequelize;

module.exports = db;