const Category = require('../Services/Category');

const postCategory = async (req, res) => {
  const { name } = req.body;

  const { status, response } = await Category.postCategory(name);

  res.status(status).json(response);
};

module.exports = {
  postCategory,
};