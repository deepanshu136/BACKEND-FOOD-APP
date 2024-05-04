const restaurentModel = require("../models/restaurentModel");

//create restaurent
module.exports.createRestaurentController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      delivery,
      isOpen,
      logurl,
      rating,
      ratingCount,
      pickup,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provde title and address",
      });
    }
    const newRestaurent = await restaurentModel.create({
      title,
      imageUrl,
      foods,
      time,
      delivery,
      isOpen,
      logurl,
      rating,
      ratingCount,
      pickup,
      code,
      coords,
    });
    await newRestaurent.save();
    //validation
    res.status(200).send({
      success: true,
      message: "New Restaurent created sucessfully",
      newRestaurent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Creating restaurent API",
      err: err,
    });
  }
};

//GET ALL  RESTAURENT
module.exports.getAllRestaurentController = async (req, res) => {
  try {
    const restaurents = await restaurentModel.find();
    if (!restaurents) {
      res.status(404).send({
        success: false,
        message: "No Restaurent Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurents.length,
      restaurents,
    });
  } catch (err) {
    console.log(err);
    res.send(500).status({
      success: false,
      message: "Error in get AllRestaurent api",
      err: err,
    });
  }
};

//GET RESTAURENT BY ID
module.exports.getRestaurentByIdController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurent id",
      });
    }
    //find restaurent
    const restaurent = await restaurentModel.findById(restaurentId);
    //validation
    if (!restaurent) {
      return res.status(404).send({
        success: false,
        message: "Restaurent not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurent Succesfully found",
      restaurent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in ret restaurent by id controller",
      err: err,
    });
  }
};

//delete restaurent
module.exports.deleteRestauretController = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    //validation
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: " currect restaurent id is required",
      });
    }
    const restaurent = await restaurentModel.findByIdAndDelete(restaurentId);
    //validation
    if (!restaurent) {
      return res.status(404).send({
        success: false,
        message: " currect restaurent id is required",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurent deleted successfully",
    });
  } catch (err) {
    cosnole.log(err);
    res.status(500).send({
      success: false,
      message: "Error in delete restaurent API",
    });
  }
};
