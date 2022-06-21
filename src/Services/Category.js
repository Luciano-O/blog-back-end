const { BlogPost, Category } = require('../database/models');

const postCategory = async (name) => {
  if (!name) {
    return {
      status: 400,
      response: { message: '"name" is required' },
    };
  }

  const category = await Category.create({ name });

  return {
    status: 201,
    response: category,
  };
};

const getCategories = async () => {
  const categories = await Category.findAll();

  return {
    status: 200,
    response: categories,
  };
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id, {
    include: [
      { model: BlogPost, as: 'blogPost' },
    ],
  });

  return { status: 200, response: category };
};

module.exports = {
  postCategory,
  getCategories,
  getCategoryById,
};