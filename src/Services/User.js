const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateNewUser = async (displayName, email, password) => {
  const regex = /\S+@\S+\.\S+/;
  const user = await User.findOne({ where: { email } });
  switch (true) {
    case displayName.length < 8:
      return { status: 400,
      response: { message: '"displayName" length must be at least 8 characters long' } };
    case !regex.test(email):
      return { status: 400,
      response: { message: '"email" must be a valid email' } };
    case password.length < 6:
      return { status: 400,
      response: { message: '"password" length must be at least 6 characters long' } };
    case user !== null:
      return { status: 409,
      response: { message: 'User already registered' } };
    default:
      return { status: 200, response: '' };
  }
};

const postUser = async (displayName, email, password, image) => {
  const valid = await validateNewUser(displayName, email, password);

  console.log(secret);

  if (valid.status !== 200) return valid;

  const response = await User.create({ displayName, email, password, image });

  const token = jwt.sign({ data: { email, id: response.id } }, secret, jwtConfig);

  return { status: 201, response: { token } };
};

const postLogin = async (email, password) => {
  if (!email || !password) {
    return { status: 400, response: { message: 'Some required fields are missing' } };
  }
  const rawUser = await User.findOne({ where: { email } });

  if (!rawUser || rawUser.dataValues.password !== password) {
    return { status: 400, response: { message: 'Invalid fields' } };
  }

  const token = jwt.sign({ data: { email, id: rawUser.id } }, secret, jwtConfig);

  return { status: 200, response: { token } };
};

const getUsers = async () => {
  const users = await User.findAll();

  const finalUsers = users
    .map(({ id, displayName, image, email }) => ({ id, displayName, image, email }));

  return {
    status: 200,
    response: finalUsers,
  };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      status: 404,
      response: { message: 'User does not exist' },
    };
  }

  return {
    status: 200,
    response: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      image: user.image,
    },
  };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });

  return { status: 204, response: null };
};

module.exports = {
  postLogin,
  postUser,
  getUsers,
  getUserById,
  deleteUser,
};