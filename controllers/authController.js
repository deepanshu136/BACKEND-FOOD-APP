const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//register
module.exports.registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    //validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all Fields",
      });
    }
    //check user
    const exisiting = await userModel.findOne({
      email,
    });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email is already register please log in",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //new user
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });
    res.status(200).send({
      success: true,
      message: "Succesfully registered",
      user,
    });
    user.save();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in register api",
      err: err,
    });
  }
};

//login
module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Please provide Email or Password",
      });
    }
    //check User
    const user = await userModel.findOne({ email: email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found ",
      });
    }
    //compare user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Correct option name for expiry
    });

    res.status(200).send({
      success: true,
      message: "login successfull",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in log in api",
      err: err,
    });
  }
};
