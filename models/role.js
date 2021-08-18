module.exports = (sequelize, Sequelize) => {
    return sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING(30),
        },
        salary: {
            type: Sequelize.FLOAT,
        },
        departmentId: {
            type: Sequelize.INTEGER,
        }
    },{
        // sets table name to not be pluralized, activates interaction timestamps, and 
        // engages paranoid mode so details will not be deleted, they will just have their
        // deletedAt attribute updated to now.
        freezeTableName: true,
        timestamps: true,
        paranoid: true,        
    });
}