const foodModel = require("../models/foodModel");

//create food
module.exports.createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurent,
      rating,
      raitingCount,
    } = req.body;
    //validation
    if (!title || !description || !price || !restaurent) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurent,
      rating,
      raitingCount,
    });
    await newFood.save();

    res.status(200).send({
      success: true,
      message: "New Food item created",
      newFood,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Create Food Api",
    });
  }
};

//get all food
module.exports.getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food item was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get All food API",
      err: err,
    });
  }
};

//get single food by id
module.exports.getSinleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "please provide  id",
      });
    }
    const food = await foodModel.findById(foodId);
    //validation
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food exist with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Succesfull",
      food,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: "false",
      message: "Error in get single food api",
    });
  }
};

//get food by restaurent
module.exports.getFoodByRestaurent = async (req, res) => {
  try {
    const restaurentId = req.params.id;
    if (!restaurentId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurent id",
      });
    }
    const food = await foodModel.find({ restaurent: "restaurentId" });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "no food found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restuatrn",
      food,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: "false",
      message: "eroor in get by restaurent APi",
      err: err,
    });
  }
};

//update food item
module.exports.updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurent,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailabe,
        restaurent,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in update food API",
      err: err,
    });
  }
};

//delete food
module.exports.deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found bu id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Delete Food Api",
      err: err,
    });
  }
};
