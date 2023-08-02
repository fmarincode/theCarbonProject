const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(iduser) {
    return this.database.query(
      `select iduser, firstname, email from  ${this.table} where iduser = ?`,
      [iduser]
    );
  }

  findAll() {
    return this.database.query(
      `select iduser, firstname, email from  ${this.table}`
    );
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

  findUserById(id) {
    return this.database.query(
      `SELECT u.iduser, u.firstname, u.email
    FROM ${this.table} AS u
    WHERE u.iduser = ?;`,
      [id]
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
