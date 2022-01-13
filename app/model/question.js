const Sequelize = require('sequelize');
const sequelize = require('../database');

class Question extends Sequelize.Model{};

Question.init(
  {
    // define columns
    question: Sequelize.TEXT,
    anecdote: Sequelize.TEXT,
    wiki: Sequelize.TEXT
  },
  {
    // table name
    tableName: 'question',
    // set connector
    sequelize,
  }
);

module.exports = Question;