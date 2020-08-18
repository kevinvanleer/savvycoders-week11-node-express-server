//const http = require("http");
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const posts = require('./routers/posts.js');
const authors = require('./routers/authors.js');
const db = require('./simpleDb.js');

const appPort = process.env.PORT || 8675;
const app = express();

app
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use('/posts', posts)
  .use('/authors', authors);

app.get('/', (req, res) => {
  console.log(process.env.USER);
  console.log(process.env.PORT);
  res.send('HELLO WORLD');
});

app.listen(appPort, () => console.log(`Listening on port ${appPort}`));
