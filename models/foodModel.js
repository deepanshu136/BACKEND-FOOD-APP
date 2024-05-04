const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title id required"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food Price id required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailabe: {
      type: Boolean,
      default: true,
    },
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurent",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    raitingCount: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Foods", foodSchema);
