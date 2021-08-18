module.exports = (sequelize, type) => {
  return sequelize.define('employee', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: type.STRING,
      },
      last_name: {
        type: type.STRING,
      },
  })
}
