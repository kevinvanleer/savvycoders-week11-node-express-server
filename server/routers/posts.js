const { Router } = require('express');
const router = Router();
const db = require('../db.js');

router
  .route('/')
  .get((request, response) => {
    db.query('SELECT * FROM posts', (error, res) => {
      if (error) {
        response.status(500).json({ error }); // send the SQL error if something goes wrong
      } else {
        response.json(res.rows);
      }
    });
  })
  .post((request, response) => {
    const newPost = request.body;
    db.query(
      `INSERT INTO posts(title, body, author_id) VALUES($1, $2, $3) RETURNING *`,
      [newPost.title, newPost.body, newPost.author_id],
      (error, res) => {
        if (error) {
          response.status(500).json({ error }); // send the SQL error if something goes wrong
        } else {
          response.json(res.rows[0]);
        }
      }
    );
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
    db.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id],
      (error, res) => {
        if (error) {
          response.status(500).json({ error }); // send the SQL error if something goes wrong
        } else {
          if (res.rows.length === 0) {
            response.status(404).json({ error: 'ID does not exist', id });
          }
          response.json(res.rows[0]);
        }
      }
    );
  });

module.exports = router;
