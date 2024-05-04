const express = require("express");
const router = express.Router();
const {
  getUserController,
  updateUserController,

  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middelwares/authMiddleware");

//routes
//GET USER
router.get("/getuser", authMiddleware, getUserController);
//UPDATE USER
router.put("/updateuser", authMiddleware, updateUserController);
//Password update
router.post("/updatepassword", authMiddleware, updatePasswordController);

//Restet password
router.post("/resetpassword", authMiddleware, resetPasswordController);
//Delete Route
router.delete("/deleteuser/:id", authMiddleware, deleteUserController);

module.exports = router;
