const client = require('../database');
const Level = require('./Level');

class CoreModel {
  #id;

  constructor(obj) {
    this.#id = obj.id;
  };

  get id() {
    return this.#id;
  };

  // Je n'ai pas besoin d'écrire de SETTER car Sequelize va le faire pour moi
  set id(value) {
    console.log("mise à jour de l'id", value);
    this.#id = value;
  };

  // ----------- STATIC ----------- //
  static async findAll() {
    // je suis dans une méthode statique, le this se rapporte à la classe 
    const query = `SELECT * FROM "${this.tableName}"`;

    try {
      // users sera la tableau que je vais retourner
      const results = [];
      const result = await client.query(query);
      //console.log(result);

      for (const row of result.rows) {
        //j'instancie un objet de type User à partir de la ligne récupérée en BDD
        const obj = new this(row);
        // le fait d'instancier la ligne retournée par la BDD, va me permettre après d'avoir des objets User et on aura donc accès aux méthodes des instances (insert,update,delete)
        results.push(obj);
      }

      return result.rows;
    } catch (err) {
      console.error(err);
    }
  };

  static async findById(id) {
    // j'utilise les requêtes préparées -- la requête préparée est une sécurité
    // le $1 sera remplacé par id (premier élément du tableau values)
    const query = {
      text: `SELECT * FROM "${this.tableName}" WHERE id=$1`,
      values: [id]
    }

    try {
      const result = await client.query(query);
      // j'instancie un objet de type User à partir de la ligne récupérée en BDD
      const obj = new this(result.rows[0]);
      return obj;
    } catch (err) {
      console.error(err);
    }
  };

  static async findBy(params) {
    const property = Object.keys(params);
    console.log('PROPERTY:', property);
    console.log('this:', this);
    console.log('this.tableName:', this.tableName);
    console.log('this.name', this.name);
    console.log('this[property]', this.property);
    console.log('this.constructor:', this.constructor);
    console.log('this.constructor.tableName', this.constructor.tableName);
    console.log('this.constuctor.properties', this.constructor.property);
    console.log('find by:', property);
    const query = {
      text: `SELECT * FROM "${this.tableName}" WHERE ${property}=$1`,
      values: [this[property]]
    };
    console.log(query);
  };

  // ----------- NOT STATIC ----------- //
  async delete() {
    const query = {
      // ici le this représente une instance, je peux accéder à la classe via une propriété native qui s'appelle constructor
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      // le this représente ici l'instance qui appelle la méthode delete
      values: [this.id]
    };
    console.log(query);

    try {
      await client.query(query);
    } catch (err) {
      console.error("DELETE =>", err);
    }
  };

  async insert() {
    const properties = Object.keys(this);

    const columns = [];
    const dollars = [];
    const values = [];
    let counter = 1;
    /*
    le this représente l'instance, on a donc un objet avec ses valeurs
    le fait de faire this[property] va aller chercher dans l'instance, la valeur à la propriété property
    */
    for (const property of properties) {
      columns.push(property);
      dollars.push('$' + counter);
      values.push(this[property]);
      counter++;
    }

    const query = {
      // je demande à la base de données de me retourner l'id généré
      // on peut demander plus que que l'id, je pourrais ajouter le name...
      text: `INSERT INTO "${this.constructor.tableName}" (${columns.join(",")}) VALUES (${dollars.join(",")}) RETURNING id`,
      // le this représente ici l'instance qui appelle la méthode insert
      values
    };

    try {
      console.log(query);
      // Je l'envoie à la base de données
      const result = await client.query(query);
      if (result.rows.length > 0) {
        // je mets à jour l'id de mon instance
        this.id = result.rows[0].id;
        //console.log(this);
      }
    } catch (err) {
      console.error("INSERT =>", err);
    }
  }

  async update() {
    const properties = Object.keys(this);
    const values = [];
    const columns = [];
    let counter = 1;
    for (const property of properties) {
      const column = property + "=$" + counter;
      columns.push(column);
      values.push(this[property]);
      counter++;
    }

    // j'ajoute l'id en dernier pour qu'il soit en 5ème position ($5)
    values.push(this.id);

    // Je crèe ma requête
    const query = {
      // je demande à la base de données de me retourner l'id généré
      // on peut demander plus que que l'id, je pourrais ajouter le name...
      text: `UPDATE "${this.constructor.tableName}" SET ${columns.join(",")} WHERE id=$${counter}`,
      // le this représente ici l'instance qui appelle la méthode insert
      values
    };

    try {
      // Je mets à jour mon enregistrement dans ma base de données
      await client.query(query);
    } catch (err) {
      console.error("UPDATE =>", err);
    }
  }
}

module.exports = CoreModel;