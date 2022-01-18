const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {

  get fullname() {
    return this.firstname + ' ' + this.lastname;
  }
}

User.init({
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  role:Sequelize.TEXT
}, {
  sequelize,
  tableName: 'new_user'
});


module.exports = User;