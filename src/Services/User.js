const { User } = require('../database/models');

const postUser = async (email, _password) => {
  const user = await User.FindByOne({ where: { email } });

  return {
    status: 200,
    response: user,
  };
};

module.exports = {
  postUser,
};