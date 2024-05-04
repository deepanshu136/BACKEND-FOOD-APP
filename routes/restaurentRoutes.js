const express = require("express");
const router = express.Router();

const authMiddleware = require("../middelwares/authMiddleware");
const {
  createRestaurentController,
  getAllRestaurentController,
  getRestaurentByIdController,
  deleteRestauretController,
} = require("../controllers/restaurentController");

//routes
//create restaurent
router.post("/create", authMiddleware, createRestaurentController);

//GET ALL RESTAURENT
router.get("/getall", getAllRestaurentController);

//GET RESTAURENT BY ID
router.get("/get/:id", getRestaurentByIdController);

//delete restaurent by
router.delete("/delete/:id", authMiddleware, deleteRestauretController);

//exports
module.exports = router;
