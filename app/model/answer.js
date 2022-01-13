const Sequelize = require('sequelize');
const sequelize = require('../database');

class Answer extends Sequelize.Model{}

Answer.init(
  {
    // define columns
    description: Sequelize.TEXT
  },
  {
    // table name
    tableName: 'answer',
    // set connector
    sequelize,
  }
);

module.exports = Answer;