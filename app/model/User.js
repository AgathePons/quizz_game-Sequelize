const client = require('../database');
const CoreModel = require("./CoreModel");

class User extends CoreModel {
  firstname;
  lastname;
  email;
  password;

  static tableName = "user";

  constructor(obj) {
    super(obj);
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.email = obj.email;
    this.password = obj.password;
  }

}

module.exports = User;