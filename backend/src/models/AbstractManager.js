class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(iduser) {
    return this.database.query(
      `select * from  ${this.table} where iduser = ?`,
      [iduser]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
