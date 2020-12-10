const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app.js');
const Book = require('../lib/models/Books.js');
const Chapter = require('../lib/models/Chapters.js');

describe('books routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });
  
  it('creates a new book via POST', async() => {
    const response = await request(app)
      .post('/api/v1/books')
      .send({
        title: 'Leathering Heights'
      });
  
    expect(response.body).toEqual({
      id: '1',
      title: 'Leathering Heights'
    });
  });
  
  it('finds a book by id via GET', async() => {
    await Promise.all([
      { title: 'cowhide' },
      { title: 'rawhide' },
      { title: 'trying to hide' }
    ].map(chapter => Chapter.insert(chapter)));
  
    const book = await Book.insert({
      title: 'Leathering Heights',
      chapters: ['cowhide', 'rawhide']
    });
  
    const response = await request(app)
      .get(`/api/v1/books/${book.id}`);
      
    expect(response.body).toEqual({
      ...book,
      chapters: ['cowhide', 'rawhide']
    });
  });
  
  it('finds all books via GET', async() => {
    const books = await Promise.all([
      { title: 'First' },
      { title: 'Second' },
      { title: 'Third' }
    ].map(book => Book.insert(book)));
  
    const response = await request(app)
      .get('/api/v1/books');
  
    expect(response.body).toEqual(expect.arrayContaining(books));
    expect(response.body).toHaveLength(books.length);
  });
  
  it('updates a book via PUT', async() => {
    const book = await Book.insert({
      title: 'Leathering Heights'
    });
  
    const response = await request(app)
      .put(`/api/v1/books/${book.id}`)
      .send({
        title: 'Leathering Lows'
      });
  
    expect(response.body).toEqual({
      id: book.id,
      title: 'Leathering Lows'
    });
  });
  
  it('deletes a book by id', async() => {
    const book = await Book.insert({
      title: 'Leathering Heights'
    });
  
    const response = await request(app)
      .delete(`/api/v1/books/${book.id}`);
  
    expect(response.body).toEqual(book);
  });
});
