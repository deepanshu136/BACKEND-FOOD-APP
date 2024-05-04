const express = require("express");
const authMiddleware = require("../middelwares/authMiddleware");
const { createFoodController } = require("../controllers/foodController");
const router = express.Router();

//routes
//create food
router.post("/create", authMiddleware, createFoodController);

//export
module.exports = router;
