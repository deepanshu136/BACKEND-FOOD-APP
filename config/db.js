const mongoose = require("mongoose");

// MongoDB connection URL
const mongoURI = "mongodb://127.0.0.1:27017/food-app";

// Connect to MongoDB
mongoose.connect(mongoURI);

// Get the default connection
const db = mongoose.connection;

// Event listeners for the database connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Export the database connection
module.exports = db;
