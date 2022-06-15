const express = require('express');
const User = require('./Connections/User');
const Category = require('./Connections/Category');
const BlogPost = require('./Connections/BlogPost');
const tokenValidation = require('./middlewares/TokenValidation');

// ...

const app = express();

app.use(express.json());

app.post('/login', User.postLogin);

app.post('/user', User.postUser);
app.get('/user', tokenValidation, User.getUsers);
app.get('/user/:id', tokenValidation, User.getUserById);

app.post('/categories', tokenValidation, Category.postCategory);
app.get('/categories', tokenValidation, Category.getCategories);

app.post('/post', tokenValidation, BlogPost.createPost);
app.get('/post', tokenValidation, BlogPost.getPosts);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
