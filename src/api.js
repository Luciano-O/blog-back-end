const express = require('express');
const cors = require('cors');
const User = require('./Connections/User');
const Category = require('./Connections/Category');
const BlogPost = require('./Connections/BlogPost');
const tokenValidation = require('./middlewares/TokenValidation');
const AccessControl = require('./middlewares/AccessControl');

const app = express();

app.use(express.json());

app.use(cors());

app.post('/login', AccessControl, User.postLogin);

app.post('/user', AccessControl, User.postUser);
app.get('/user', AccessControl, tokenValidation, User.getUsers);
app.get('/post/random', AccessControl, BlogPost.getRandomPosts);
app.get('/user/me', AccessControl, tokenValidation, User.getMyUser);
app.delete('/user/me', AccessControl, tokenValidation, User.deleteUser);
app.get('/user/:id', AccessControl, tokenValidation, User.getUserById);

app.post('/categories', AccessControl, tokenValidation, Category.postCategory);
app.get('/categories/:id', AccessControl, Category.getCategoryById);
app.get('/categories', AccessControl, Category.getCategories);

app.post('/post', AccessControl, tokenValidation, BlogPost.createPost);
app.get('/post', AccessControl, BlogPost.getPosts);
app.get('/post/search', AccessControl, tokenValidation, BlogPost.searchByTerm);
app.get('/post/:id', AccessControl, tokenValidation, BlogPost.getPostById);
app.put('/post/:id', AccessControl, tokenValidation, BlogPost.putPost);
app.delete('/post/:id', AccessControl, tokenValidation, BlogPost.deletePost);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
