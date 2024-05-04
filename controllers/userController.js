const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//GET USER INFO
module.exports.getUserController = async (req, res) => {
  try {
    //find usser
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not Found",
      });
    } //hide password
    user.password = undefined;
    //resp
    res
      .status(200)
      .send({ success: true, message: "User data get sucessfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get User Api",
    });
  }
};

//update user
module.exports.updateUserController = async (req, res) => {
  try {
    //find User
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //Update
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Succssfully updated user value",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(505).send({
      success: false,
      message: "err in update user api ",
      err: err,
    });
  }
};

//update user password

module.exports.updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide new or old password",
      });
    }
    //compare user password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    user.password = newPassword;
    //hashing new password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updaed Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in update password api",
      err: err,
    });
  }
};

// reset password
module.exports.resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset sucessfull",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in reset password API",
      err: err,
    });
  }
};

//DELETE USER
module.exports.deleteUserController = async (req, res) => {
  try {
    // Ensure req.params.id is a string
    const userId = req.params.id.toString();

    // Find user by ID
    const user = await userModel.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Delete user
    await userModel.findByIdAndDelete(userId);

    // Send success response
    return res.status(200).send({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in Delete User API",
      error: err,
    });
  }
};
