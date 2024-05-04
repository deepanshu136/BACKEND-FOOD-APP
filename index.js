const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const db = require("./config/db");

//dot env configuration
dotenv.config();
//db connection
db;
//middelware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//api routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurent", require("./routes/restaurentRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/vi/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  res.send("food-app");
});

app.listen(PORT, (req, res) => {
  console.log(`server running on ${PORT}`);
});
