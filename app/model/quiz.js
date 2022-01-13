const Sequelize = require('sequelize');
const sequelize = require('../database');

class Quiz extends Sequelize.Model{};

Quiz.init(
  {
    // define columns
    title: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    description: Sequelize.TEXT
  },
  {
    // table name
    tableName: 'quiz',
    // set connector
    sequelize,
  }
);

module.exports = Quiz;