const BlogPost = require('../Services/BlogPost');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const { status, response } = await BlogPost.createPost(title, content, categoryIds);

  res.status(status).json(response);
};

module.exports = {
  createPost,
};