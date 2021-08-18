module.exports = (sequelize, Sequelize) => {
  return sequelize.define('employee', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      roleId:{
        type: Sequelize.INTEGER,
      },
      managerId:{
        type: Sequelize.INTEGER,
      }
  })
}
