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