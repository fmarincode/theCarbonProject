const AbstractManager = require("./AbstractManager");

class FlightManager extends AbstractManager {
  constructor() {
    super({ table: "planeJourney" });
  }

  insert(flight) {
    return this.database.query(
      `insert into ${this.table} (departure, arrival, passengers, totalKgEmission, kmDistance, user_iduser) values (?, ?, ?, ?, ?, ?)`,
      [
        flight.departure,
        flight.arrival,
        flight.passengers,
        flight.totalKgEmission,
        flight.kmDistance,
        flight.user_iduser,
      ]
    );
  }

  update(flight) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [flight.title, flight.id]
    );
  }

  findByUser(user_iduser) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_iduser = ?`,
      [user_iduser]
    );
  }

  delete(idPlaneJourney) {
    return this.database.query(
      `delete from ${this.table} where idPlaneJourney = ?`,
      [idPlaneJourney]
    );
  }
}

module.exports = FlightManager;
