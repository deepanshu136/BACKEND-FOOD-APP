const express = require("express");
const authMiddleware = require("../middelwares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
} = require("../controllers/foodController");
const router = express.Router();

//routes
//create food
router.post("/create", authMiddleware, createFoodController);
//get all foods
router.get("/getAll", getAllFoodsController);
//export
module.exports = router;
