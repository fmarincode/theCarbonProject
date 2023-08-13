const AbstractManager = require("./AbstractManager");

class carManager extends AbstractManager {
  constructor() {
    super({ table: "carJourney" });
  }

  insert(car) {
    return this.database.query(
      `insert into ${this.table} (departure, arrival, totalKgEmission, kmDistance, user_iduser) values (?, ?, ?, ?, ?)`,
      [
        car.departure,
        car.arrival,
        car.totalKgEmission,
        car.kmDistance,
        car.user_iduser,
      ]
    );
  }

  update(car) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [car.title, car.id]
    );
  }

  findByUser(user_iduser) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_iduser = ?`,
      [user_iduser]
    );
  }

  delete(idCarJourney) {
    return this.database.query(
      `delete from ${this.table} where idCarJourney = ?`,
      [idCarJourney]
    );
  }
}

module.exports = carManager;
