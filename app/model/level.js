const Sequelize = require('sequelize');
const sequelize = require('../database');

class Level extends Sequelize.Model{}

Level.init(
  {
    // define columns
    name: Sequelize.TEXT
  },
  {
    // table name
    tableName: 'level',
    // set connector
    sequelize,
    //underscored: true // if we want snake_case instead of camelCase for this table
  }
);

module.exports = Level;