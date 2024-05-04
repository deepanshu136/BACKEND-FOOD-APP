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
      return res.status(500).send({
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
