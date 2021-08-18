module.exports = (sequelize, type) => {
    return sequelize.define('department', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(30),
        }
    }  
)}