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
    });
}