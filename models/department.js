module.exports = (sequelize, Sequelize) => {
    return sequelize.define('department', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(30),
        }
    }  
)}