const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {title: 'Hello'});
});

module.exports = app;
