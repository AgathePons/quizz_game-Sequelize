const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};

User.init({
  // define columns
  firstname: Sequelize.TEXT,
  lastname: Sequelize.TEXT,
  email: Sequelize.TEXT,
  password: Sequelize.TEXT
},
{
  // table name
  tableName: 'user',
  // set connector
  sequelize,
});

module.exports = User;