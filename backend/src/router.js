const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

const { hashPassword } = require("./auth");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
