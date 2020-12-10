const express = require('express');
const Book = require('./models/Books.js');
const Chapter = require('./models/Chapters.js');
const app = express();

app.use(express.json());

app.post('/api/v1/books', (req, res, next) => {
  Book
    .insert(req.body)
    .then(book => res.send(book))
    .catch(next);
});

app.get('/api/v1/books/:id', (req, res, next) => {
  Book
    .findById(req.params.id)
    .then(book => res.send(book))
    .catch(next);
  
});

app.get('/api/v1/books', (req, res, next) => {
  Book
    .find()
    .then(books => res.send(books))
    .catch(next);
});

app.put('/api/v1/books/:id', (req, res, next) => {
  Book
    .update(req.params.id, req.body)
    .then(book => res.send(book))
    .catch(next);
    
});

app.delete('/api/v1/books/:id', (req, res, next) => {
  Book
    .delete(req.params.id)
    .then(book => res.send(book))
    .catch(next);
});

app.post('/api/v1/chapters', (req, res, next) => {
  Chapter
    .insert(req.body)
    .then(chapter => res.send(chapter))
    .catch(next);
});
module.exports = app;

