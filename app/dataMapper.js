const client = require('./database');
const Level = require('./model/Level');

const dataMapper = {
  async getAllLevels() {
    const query = 'SELECT * FROM level';

    try {
      const levels = [];
      const result = await client.query(query);

      for(const row of result.rows) {
        const level = new Level(row);
        levels.push(level);
      }
      console.log(levels);
    } catch(err) {
      console.error('Error:', err);
    }
  },

  async getOneLevel(id) {
    const query = 'SELECT * FROM level WHERE id=$1';
    const values = [id];

    try {
      const result = await client.query(query, values);
      const level = new Level(result.rows[0]);

      //!
      console.log(level);

      return level;
    } catch(err) {
      console.error('Error:', err);
    }
  }
}

module.exports = dataMapper;