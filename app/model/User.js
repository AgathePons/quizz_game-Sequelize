const client = require('../database');
const CoreModel = require("./CoreModel");

class User extends CoreModel {
  firstname;
  lastname;
  email;
  password;

  constructor(obj) {
    super(obj);
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
    this.email = obj.email;
    this.password = obj.password;
  }

  //get all
  static async getAllUsers() {
    const query = 'SELECT * FROM "user"';

    try {
      const users = [];
      const result = await client.query(query);

      for (const row of result.rows) {
        const user = new User(row);
        users.push(user);
      }
      return users;
    } catch(err) {
      console.log('Error:', err);
    }
  }

  //get one
  static async getOneUser(id) {
    const query = {
      text: 'SELECT * FROM "user" WHERE id=$1',
      values: [id]
    };

    try {
      const result = await client.query(query);
      const user = new User(result.rows[0]);
      return user;
    } catch(err) {
      console.error('Error:', err);
    }
  }

  //insert new user
  async insert() {
    const query = {
      text: `INSERT INTO "user" ("firstname", "lastname", "email", "password") 
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
      values: [this.firstname, this.lastname, this.email, this.password]
    }

    try {
      const result = await client.query(query);
      //!
      if(result.rows.length > 0) {
        this.id = result.rows[0].id;
      }
    } catch(err) {
      console.error('Error', err);
    }
  }

  //update user
  async update() {
    const query = {
      text: `UPDATE "user" SET "firstname"=$1,"lastname"=$2,"email"=$3,"password"=$4 WHERE id=$5`,
      values: [this.firstname,this.lastname, this.email, this.password, this.id]
    };
    try {
      //!
      //console.log('before:', this);
      await client.query(query);
      //console.log('after', this);
    } catch(err) {
      console.error('Error:', err);
    }
  }

  //delete user
  async delete() {
    const query = {
      text: 'DELETE FROM "user" WHERE id=$1',
      values: [this.id]
    };
    //!
    //console.log('query:', query);
    try {
      const result = await client.query(query);
    } catch(err) {
      console.error('Error:', err);
    }
  }
}
// refacto incoming
module.exports = User;