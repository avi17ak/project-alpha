const db = require("../db/connect");

class User {
  constructor({ userid, name, email, password, username }) {
    this.userid = userid;
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE userId = $1;", [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error("User not found");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );

    if (response.rows.length != 1) {
      throw new Error("Username not found");
    }
    return new User(response.rows[0]);
  }

  static async createUser(data) {
    const { name, email, password, username } = data;
    let response = await db.query(
      "INSERT INTO users (name, email, password, username) VALUES ($1, $2, $3, $4) RETURNING userId;",
      [name, email, password, username]
    );
    const newId = response.rows[0].userid;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
