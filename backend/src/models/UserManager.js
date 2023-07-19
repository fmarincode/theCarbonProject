const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, email, hashedPassword) values (?, ?, ?)`,
      [user.firstname, user.email, user.hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }

  findByEmail(email) {
    return this.database.query(
      `SELECT iduser, firstname FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = UserManager;
