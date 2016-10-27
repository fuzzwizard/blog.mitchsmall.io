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
  console.log(`Request recieved on route ${req.url} with metho ${req.method}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(DIR));
});

app.get('/:content/:postname', (req, res) => {
  const content = req.params.content;

  if (content === 'pages' || content === 'posts') {
    res.sendFile(path.join(DIR, content, req.params.postname));
  } else {
    res.send(404);
  }
});

const listenOn =
  process.env.PORT || PORT || 8080;

const address = ARGS[0] === '--local'
  ? ADDRESS
  : '127.0.0.1';

app.listen(listenOn, address, function() {
  console.log(`Server listening on ${listenOn}`.green);
});