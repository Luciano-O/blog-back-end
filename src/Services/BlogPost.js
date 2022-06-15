const Sequelize = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const verifyCreate = (title, content, categoryIds) => {
  if (!title || !content) {
    return {
      status: 400,
      response: { message: 'Some required fields are missing' },
    };
  }

  if (!categoryIds) {
    return {
      status: 400,
      reponse: { message: '"categoryIds" not found' },
    };
  }

  return { status: 200, response: '' };
};

const createPost = async (title, content, categoryIds, userId) => {
  const verify = verifyCreate(title, content, categoryIds);
  if (verify.status === 400) return verify;
  const t = await sequelize.transaction();

  try {
    const { dataValues } = await BlogPost.create({ title, content, userId }, { transaction: t });
    const insert = categoryIds.map((item) => ({ postId: dataValues.id, categoryId: item }));
    await PostCategory.bulkCreate(insert, { transaction: t });

    const post = await BlogPost.findByPk(dataValues.id, { transaction: t });

    await t.commit();

    return {
      status: 201,
      response: post,
    };
  } catch (e) {
    await t.rollback();
    return { status: 400, response: { message: '"categoryIds" not found' } };
  }
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return {
    status: 200,
    response: posts,
  };
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!post) {
    return {
      status: 404,
      response: { message: 'Post does not exist' },
    };
  }

  return {
    status: 200,
    response: post,
  };
};

const putPost = async (id, title, content, userId) => {
  if (!title || !content) {
    return { status: 400, response: { message: 'Some required fields are missing' } };
  }

  const post = await BlogPost.findByPk(id);
  
  if (post.userId !== userId) {
    return { status: 401, response: { message: 'Unauthorized user' } };
  }
  
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  const updatedPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return { status: 200, response: updatedPost };
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);

  if (!post) return { status: 404, response: { message: 'Post does not exist' } };
  console.log(post.dataValues.userId !== userId);
  if (post.dataValues.userId !== userId) {
    return { status: 401, response: { message: 'Unauthorized user' } };
  }

  await BlogPost.destroy({ where: { id } });

  return { status: 204, response: null };
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  putPost,
  deletePost,
};