const client = require('../database');
const CoreModel = require('./CoreModel');

class Level extends CoreModel {
  name;

  constructor(obj) {
    super(obj);
    this.name = obj.name;
  }

  // get all levels
  static async getAllLevels() {
    const query = 'SELECT * FROM level';

    try {
      const levels = [];
      const result = await client.query(query);

      for (const row of result.rows) {
        const level = new Level(row);
        levels.push(level);
      }
      return levels;
      console.log(levels);
    } catch (err) {
      console.error('Error:', err);
    }
  }

  // get one level
  static async getOneLevel(id) {
    const query = 'SELECT * FROM level WHERE id=$1';
    const values = [id];

    try {
      const result = await client.query(query, values);
      const level = new Level(result.rows[0]);

      //!
      console.log(level);

      return level;
    } catch (err) {
      console.error('Error:', err);
    }
  }

  // insert new level
  async insert() {
    const query = {
      // je demande à la base de données de me retourner l'id généré
      // on peut demander plus que que l'id, je pourrais ajouter le name...
      text: `INSERT INTO level ("name") VALUES ($1) RETURNING id`,
      // le this représente ici l'instance qui appelle la méthode insert
      values: [this.name]
    };

    try {
      // Je l'envoie à la base de données
      const result = await client.query(query);
      if (result.rows.length > 0) {
        // je mets à jour l'id de mon instance
        this.id = result.rows[0].id;
        console.log(this);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // update level
  async insert() {
    const query = {
      // je demande à la base de données de me retourner l'id généré
      // on peut demander plus que que l'id, je pourrais ajouter le name...
      text: `UPDATE level SET "name"=$1 WHERE id=$2`,
      // le this représente ici l'instance qui appelle la méthode insert
      values: [this.name, this.id]
    };

    try {
      // Je l'envoie à la base de données
      const result = await client.query(query);
      if (result.rows.length > 0) {
        // je mets à jour l'id de mon instance
        this.id = result.rows[0].id;
        console.log(this);
      }
    } catch (err) {
      console.error(err);
    }
  }

    // delete
    async delete() {
      const query = {
        text: `DELETE FROM level WHERE id=$1`,
        values: [this.id]
      };

      try {
        const result = await client.query(query);
      } catch (err) {
        console.error(err);
      }
    }
  }

  module.exports = Level;