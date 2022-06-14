const User = require('../Services/User');

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const { status, response } = await User.postLogin(email, password);

  res.status(status).json(response);
};

const postUser = async (req, res) => {
  const {
    displayName,
    email,
    password,
    image,
  } = req.body;

  const { status, response } = await User.postUser(displayName, email, password, image);

  res.status(status).json(response);
};

const getUsers = async (req, res) => {
  const { status, response } = await User.getUsers();

  res.status(status).json(response);
};

module.exports = {
  postLogin,
  postUser,
  getUsers,
};