const categoryModel = require("../models/categoryModel");

//CREATE CATEGORY
module.exports.createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // Validate request body
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide category title",
      });
    }

    // Create new category
    const newCategory = await categoryModel.create({ title, imageUrl });

    // Send success response
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error in createCatController:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get all category
module.exports.getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    //validation
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in get All categpry API",
      err: err,
    });
  }
};

//update category
module.exports.updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category found",
      });
    }
    await updateCategory.save();
    res.status(200).send({
      success: true,
      message: "Category updated Successfully",
      updateCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Update Category Api",
      err: err,
    });
  }
};

//Delete Category
module.exports.deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please Provide vaid category i",
      });
    }
    const Category = await categoryModel.findByIdAndDelete(id);
    if (!Category) {
      return res.status(500).send({
        success: false,
        message: "Category not found",
      });
    }
    // Send success response
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in category api",
      err: err,
    });
  }
};
