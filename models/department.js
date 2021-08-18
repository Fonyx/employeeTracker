const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
        },
    },{
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'department',
    }
);

module.exports = {Department};