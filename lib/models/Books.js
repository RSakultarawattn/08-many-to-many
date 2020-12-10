const pool = require('../utils/pool');

module.exports = class Book {
    id;
    title;


    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      
      
    }

    static async insert({ title, chapters = [] }) {
      const { rows } = await pool.query(
        'INSERT INTO books (title) VALUES ($1) RETURNING *',
        [title]
      );

      await pool.query(
        `INSERT INTO books_chapters (book_id, tag_id)
          SELECT ${rows[0].id}, id FROM tags WHERE title = ANY($1::title[])`,
        [chapters]
      );

      return new Book(rows[0]);
    }


    static async find() {
      const { rows } = await pool.query('SELECT * FROM books'); 

      return rows.map(row => new Book(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT
         books.*,
         array_agg(chapters.title)) AS chapters
          FROM 
          books_chapters 
          JOIN chapters
          ON books_chapters.book_id = books.id
          JOIN chapters
          ON books_chapters.chapter_id = tweets.id
          WHERE books.id=$1
          GROUP BY books.id
          `,
        [id]
      );
      if(!rows[0]) throw new Error(`No book with id ${id}`);
      return {
        ...new Book(rows[0]),
        chapters: rows[0].chapters
      };
    }

    static async update(id, { title }) {
      const { rows } = await pool.query(
        'UPDATE books SET title=$1 WHERE id=$1 RETURNING *',
        [title, id]
      );

      return new Book(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM books WHERE id=$1 RETURNING *',
        [id]
      );

      return new Book(rows[0]);
    }
};
