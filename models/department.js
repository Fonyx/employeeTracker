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
    },{
        // sets table name to not be pluralized, activates interaction timestamps, and 
        // engages paranoid mode so details will not be deleted, they will just have their
        // deletedAt attribute updated to now.
        freezeTableName: true,
        timestamps: true,
        paranoid: true,        
    }
)}