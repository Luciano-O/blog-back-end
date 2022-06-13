const express = require('express');
const User = require('./Connections/User');

// ...

const app = express();

app.use(express.json());

app.post('/login', User.postUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
