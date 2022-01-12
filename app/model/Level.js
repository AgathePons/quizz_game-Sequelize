const client = require('../database');
const CoreModel = require('./CoreModel');

class Level extends CoreModel {
  name;

  static tableName = "level";

  constructor(obj) {
    super(obj);
    this.name = obj.name;
  }

}

  module.exports = Level;