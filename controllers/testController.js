module.exports.testUserController = (req, res) => {
  try {
    res.status(200).send(" <h1>Test User Data</h1>");
  } catch (err) {
    console.log("error in text Api", err);
  }
};
