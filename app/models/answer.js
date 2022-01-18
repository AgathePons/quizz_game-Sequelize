const Sequelize = require('sequelize');
const sequelize = require('../database');

class Answer extends Sequelize.Model {}

Answer.init({
  description: Sequelize.STRING,
  isGoodAnswer : Sequelize.BOOLEAN
  // is_good_answer : Sequelize.BOOLEAN fonctionnait aussi et on avait pas besoin de mettre le underscored
},{
  sequelize,
  tableName: 'new_answer',
  underscored:true
});

module.exports = Answer;