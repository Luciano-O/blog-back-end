const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const postUser = async (email, password) => {
  if (!email || !password) {
    return { status: 400, response: { message: 'Some required fields are missing' } };
  }
  const rawUser = await User.findOne({ where: { email } });

  if (!rawUser || rawUser.dataValues.password !== password) {
    return { status: 400, response: { message: 'Invalid fields' } };
  }

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return { status: 200, response: { token } };
};

module.exports = {
  postUser,
};