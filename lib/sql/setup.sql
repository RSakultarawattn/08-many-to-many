DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;
DROP TABLE IF EXISTS books_chapters;

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255)
);

CREATE TABLE chapters (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(20)
);

CREATE TABLE books_chapters (
  book_id BIGINT REFERENCES books(id),
  chapter_id BIGINT REFERENCES chapters(id),
  PRIMARY KEY(book_id, chapter_id)
);

-- INSERT INTO chapters (title) VALUES ('blues');
-- INSERT INTO chapters (title) VALUES ('reds');
-- INSERT INTO chapters (title) VALUES ('yellows');
-- INSERT INTO chapters (title) VALUES ('greens');
-- INSERT INTO chapters (title) VALUES ('purples');

-- INSERT INTO books (title) VALUES ('colors of life');
-- INSERT INTO books (title) VALUES ('colors of death');
-- INSERT INTO books (title) VALUES ('colors of color');
-- INSERT INTO books (title) VALUES ('color');
-- INSERT INTO books (title) VALUES ('colorless');
-- INSERT INTO books (title) VALUES ('colors of days');
-- INSERT INTO books (title) VALUES ('whatever color');

-- SELECT * FROM chapters
-- SELECT * FROM books;

-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (1, 1);
-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (1, 2);

-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (2, 1);
-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (2, 2);
-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (2, 3);

-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (3, 1);
-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (3, 4);

-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (4, 5);

-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (5, 1);
-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (5, 3);

-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (6, 4);

-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (7, 1);
-- INSERT INTO books_chapters (book_id, chapter_id) VALUES (7, 4);

-- SELECT
--     chapters.title,
--     array_agg(books.title)
-- FROM
--     books_chapters
-- JOIN books
-- ON books_chapters.book_id = books.id
-- JOIN chapters
-- ON books_chapters.chapter_id = chapters.id
-- WHERE chapter_id = 1
-- GROUP BY chapters.title;

-- SELECT
--     books.*,
--     array_agg(chapters.title)
-- FROM
--     books_chapters
-- JOIN tags
-- ON books_chapters.chapter_id = chapters.id
-- JOIN tweets
-- ON books_chapters.book_id = books.id
-- WHERE books.id = 1
-- GROUP BY books.id, books.title;

-- SELECT
--     chapters.title,
--     COUNT(*)
-- FROM
--     books_chapters
-- JOIN chapters
-- ON books_chapters.chapter_id = chapters.id
-- GROUP BY chapters.title
-- ORDER BY count DESC
-- LIMIT 3


