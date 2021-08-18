const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);

// Employee.associate = models => {
//   Employee.hasOne(models.Role, {
//     // when we delete the user, do nothing to the role
//     onDelete: 'cascade',
//     foreignKey: {
//       allowNull: false,
//     }
//   });
//   Employee.hasOne(models.Department, {
//     // when we delete the employee, cascade 
//     onDelete: 'cascade',
//   });
// }

module.exports = {Employee};
