const Sequelize = require('sequelize');
const sequelize = require('../database');

class Tag extends Sequelize.Model{};

Tag.init(
  {
    // define columns
    name: Sequelize.TEXT
  },
  {
    // table name
    tableName: 'tag',
    // set connector
    sequelize,
    //underscored: true // if we want snake_case instead of camelCase for this table
  }
);

module.exports = Tag;