const { Router } = require('express');
const router = Router();
const db = require('../simpleDb.js');

router
  .route('/')
  .get((request, response) => {
    const posts = db.get('posts').value();
    response.send(posts);
  })
  .post((request, response) => {
    console.log(request.body);
    const post = db.get('posts').insert(request.body).write();

    response.send(post);
  });

router
  .route('/:id')
  .get((request, response) => {
    const id = request.params.id;
    let contents = '';

    request.on('data', (chunk) => (contents += chunk));

    request.on('end', () => {
      const post = db
        .get('posts')
        .updateById(id, {
          body: contents,
        })
        .write();

      if (post) {
        response.send(post);
      } else {
        response.status(404).send('That ID does not exist');
      }
    });
  })
  .patch((request, response) => {
    const id = request.params.id;
    let contents = '';

    request.on('data', (chunk) => (contents += chunk));

    request.on('end', () => {
      const post = db
        .get('posts')
        .updateById(id, {
          body: contents,
        })
        .write();

      if (post) {
        response.send(post);
      } else {
        response.status(404).send('Not Found');
      }
    });

    response.status(500).send('Internal Server Error');
  })
  .delete((request, response) => {
    const id = request.params.id;
    const post = db.get('posts').removeById(id).write();

    if (post) {
      response.send(post);
    } else {
      response.status(404).send('Not Found');
    }
  });

module.exports = router;
