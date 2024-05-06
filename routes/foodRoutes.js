const express = require("express");
const authMiddleware = require("../middelwares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSinleFoodController,
  getFoodByRestaurent,
  updateFoodController,
  deleteFoodController,
} = require("../controllers/foodController");
const router = express.Router();

//routes
//create food
router.post("/create", authMiddleware, createFoodController);
//get all foods
router.get("/getAll", getAllFoodsController);
//get single food by id
router.get("/get/:id", getSinleFoodController);
//get  food byrestaurent
router.get("/getByRestaurent/:id", getFoodByRestaurent);
//update food item
router.put("/update/:id", authMiddleware, updateFoodController);
//delete food item
router.delete("/delete/:id", authMiddleware, deleteFoodController);
//export
module.exports = router;
