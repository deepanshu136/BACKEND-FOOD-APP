const mongoose = require("mongoose");

const restaurentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: ["true", "Restaurent title is Required"],
    },
    imageUrl: {
      type: String,
    },
    foods: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logourl: {
      type: String,
    },
    rating: {
      type: Number,
      default: true,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      latitudeDelta: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      longitudeDelta: {
        type: Number,
      },
      address: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("restaurent", restaurentSchema);
