const express = require("express");
const authMiddleware = require("../middelwares/authMiddleware");
const {
  createCatController,
  updateCategoryController,
  getAllCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const router = express.Router();

//routes
//create category
router.post("/create", authMiddleware, createCatController);
//get category
router.get("/getAll", getAllCategoryController);
//update category
router.put("/update/:id", authMiddleware, updateCategoryController);
//Delete category
router.delete("/delete/:id", authMiddleware, deleteCategoryController);
//exports
module.exports = router;
