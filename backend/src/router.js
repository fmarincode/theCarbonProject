const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

const flightControllers = require("./controllers/flightControllers");

const { hashPassword } = require("./auth");

/* router.get("/users", userControllers.browse); */
router.get("/users", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

/* router.get("/flights", flightControllers.browse); */
router.get("/flights", flightControllers.read);
router.put("/flights/:id", flightControllers.edit);
router.post("/flights", flightControllers.add);
router.delete("/flights/:id", flightControllers.destroy);

module.exports = router;
