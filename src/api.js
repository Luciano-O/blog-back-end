const express = require('express');
const User = require('./Connections/User');
const tokenValidation = require('./middlewares/TokenValidation');

// ...

const app = express();

app.use(express.json());

app.post('/login', User.postLogin);

app.post('/user', tokenValidation, User.postUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
