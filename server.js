const {PATHS, PORT, ADDRESS} = require('./config.js');
const ARGS = process.argv.slice(2);

const express = require('express');
const colors = require('colors');
const path = require('path');

const app = express();

const DIR = path.join(__dirname, PATHS.destination);

app.use(express.static(DIR));
app.use('/img', express.static(DIR + '/img'));

app.use((req, res, next) => {
  console.log(`Request recieved on route ${req.url} with method ${req.method}`.blue);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(DIR));
});

app.get('/404', (req, res) => {
  res.sendFile(path.join(DIR, '/404'));
})

app.get('/:content/:postname', (req, res) => {
  const content = req.params.content;

  if (content === 'pages' || content === 'posts') {
    res.sendFile(path.join(DIR, content, req.params.postname));
  } else {
    res.send(404).redirect('/404');
  }
});

app.all('/*', (req, res) => {
  res.redirect('/404');
});

const listenOn =
  process.env.PORT || PORT || 8080;

app.listen(listenOn, '0.0.0.0', function() {
  console.log(`Server listening on ${listenOn}`.green);
});