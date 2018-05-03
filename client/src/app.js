const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {title: 'Hello'});
});

app.get('/login', (req, res) => {
  res.render('login', {title: 'Login'});
});

module.exports = app;
