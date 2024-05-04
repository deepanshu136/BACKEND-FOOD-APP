const express = require("express");
const router = express.Router();
const { testUserController } = require("../controllers/testController");
//routes
router.get("/test-user", testUserController);

module.exports = router;
