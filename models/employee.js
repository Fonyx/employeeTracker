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
  },{
    // sets table name to not be pluralized, activates interaction timestamps, and 
    // engages paranoid mode so details will not be deleted, they will just have their
    // deletedAt attribute updated to now.
    freezeTableName: true,
    timestamps: true,
    paranoid: true,        
})
}
