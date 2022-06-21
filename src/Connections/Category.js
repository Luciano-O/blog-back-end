const Category = require('../Services/Category');

const postCategory = async (req, res) => {
  const { name } = req.body;

  const { status, response } = await Category.postCategory(name);

  res.status(status).json(response);
};

const getCategories = async (req, res) => {
  const { status, response } = await Category.getCategories();

  res.status(status).json(response);
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const { status, response } = await Category.getCategoryById(id);

  res.status(status).json(response);
};

module.exports = {
  postCategory,
  getCategories,
  getCategoryById,
};