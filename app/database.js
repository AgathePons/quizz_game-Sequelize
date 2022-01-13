// On reécrit le database en passant par Sequelize
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    // choose the format column by column
    /* updatedAt: 'updated_at',
    createdAt: 'created_at', */
    // or choose snake_case instead camelCase for all (we can write the same code in one model to apply only on one model)
    underscored: true 
  }
});

module.exports = sequelize;