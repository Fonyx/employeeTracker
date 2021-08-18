const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(30),
        },
        salary: {
            type: DataTypes.FLOAT,
        }
    },{
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'role',
    }
);

// set the foreign key to the department
// Role.associate = models => {
//     Role.hasOne(Department, {
//         // when we delete this role, do nothing to the department
//         onDelete: 'cascade',
//         foreignKey: {
//             allowNull: false,
//         }
//     });
// }

module.exports = {Role};