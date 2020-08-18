const { Router } = require('express');
const router = Router();
const db = require('../db.js');

router
  .route('/')
  .get((request, response) => {
    db.query('SELECT * FROM authors', (error, res) => {
      if (error) {
        response.status(500).json({ error }); // send the SQL error if something goes wrong
      } else {
        console.log(res.rows);
        response.json(res.rows);
      }
    });
  })
  .post((request, response) => {
    const newAuthor = request.body;
    db.query(
      `INSERT INTO authors(name, email) VALUES($1, $2) RETURNING *`,
      [newAuthor.name, newAuthor.email],
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

    db.query('SELECT * FROM authors WHERE id = $1', [id], (error, res) => {
      if (error) {
        response.status(500).json({ error }); // send the SQL error if something goes wrong
      } else {
        if (res.rows.length === 0) {
          response.status(404).json({ error: 'ID does not exist', id });
        }
        response.json(res.rows[0]);
      }
    });
  })
  .patch((request, response) => {
    const id = request.params.id;
    db.query(
      'UPDATE authors SET $1 = $2, WHERE id = $1',
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
  })
  .delete((request, response) => {
    const id = request.params.id;
    db.query(
      'DELETE FROM authors WHERE id = $1 RETURNING *',
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
