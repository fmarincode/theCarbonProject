const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/email", userControllers.readByEmail);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

const { hashPassword, verifyPassword, sendToken } = require("./auth");

router.post("/users", hashPassword, userControllers.add);

router.post(
  "/login",
  userControllers.getUserAndNext,
  verifyPassword,
  sendToken
);

const flightControllers = require("./controllers/flightControllers");

router.get("/flights", flightControllers.browse);
router.get("/flights/:id", flightControllers.read);
router.put("/flights/:id", flightControllers.edit);
router.post("/flights", flightControllers.add);
router.delete("/flights/:id", flightControllers.destroy);

module.exports = router;
