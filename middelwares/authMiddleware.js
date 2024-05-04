const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    //get tokewn
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
          err: err,
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "please provide auth token",
      err: err,
    });
  }
};
