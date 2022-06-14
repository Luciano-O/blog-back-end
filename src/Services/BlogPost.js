const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../database/models');
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

const createPost = async (title, content, categoryIds) => {
  const verify = verifyCreate(title, content, categoryIds);
  if (verify.status === 400) return verify;
  const t = await sequelize.transaction();

  try {
    const { dataValues } = await BlogPost.create({ title, content, userId: 1 }, { transaction: t });
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

module.exports = {
  createPost,
};