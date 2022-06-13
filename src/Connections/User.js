const User = require('../Services/User');

const postUser = async (req, res) => {
  const { email, password } = req.body;

  const { status, response } = await User.postUser(email, password);

  res.status(status).json(response);
};

module.exports = {
  postUser,
};