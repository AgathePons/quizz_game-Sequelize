const Sequelize = require('sequelize');
const sequelize = require('../database');

class Answer extends Sequelize.Model {}

Answer.init({
  description: Sequelize.STRING,
  isGoodAnswer: Sequelize.BOOLEAN
},{
  sequelize,
  tableName: 'answer',
  underscored: true
});

module.exports = Answer;