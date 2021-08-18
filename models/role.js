module.exports = (sequelize, type) => {
    return sequelize.define('role', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: type.STRING(30),
        },
        salary: {
            type: type.FLOAT,
        }
    });
}