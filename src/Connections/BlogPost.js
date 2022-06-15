const BlogPost = require('../Services/BlogPost');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const { status, response } = await BlogPost.createPost(title, content, categoryIds);

  res.status(status).json(response);
};

const getPosts = async (req, res) => {
  const { status, response } = await BlogPost.getPosts();

  res.status(status).json(response);
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  const { status, response } = await BlogPost.getPostById(id);

  res.status(status).json(response);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};