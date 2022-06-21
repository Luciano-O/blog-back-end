const BlogPost = require('../Services/BlogPost');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user;

  const { status, response } = await BlogPost.createPost(title, content, categoryIds, userId);

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

const putPost = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;
  const { title, content } = req.body;

  const { status, response } = await BlogPost.putPost(id, title, content, userId);

  res.status(status).json(response);
};

const deletePost = async (req, res) => {
  const userId = req.user;
  const { id } = req.params;

  const { status, response } = await BlogPost.deletePost(id, userId);

  res.status(status).json(response);
};

const searchByTerm = async (req, res) => {
  const { q } = req.query;

  const { status, response } = await BlogPost.searchByTerm(q);

  res.status(status).json(response);
};

const getRandomPosts = async (req, res) => {
  const { status, response } = await BlogPost.getRandomPosts();

  res.status(status).json(response);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  putPost,
  deletePost,
  searchByTerm,
  getRandomPosts,
};