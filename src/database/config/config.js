require('dotenv').config();

const options = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  dialect: process.env.DIALECT,
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
