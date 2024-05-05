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
