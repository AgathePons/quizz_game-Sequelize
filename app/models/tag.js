const Sequelize = require('sequelize');
const sequelize = require('../database');

class Tag extends Sequelize.Model {}

Tag.init({
  name: Sequelize.STRING
},{
  sequelize,
  tableName: 'new_tag'
});

// on exporte la class directement !
module.exports = Tag;