const pool = require('../utils/pool');


module.exports = class Chapter {
    id;
    title;
    length;
    

    constructor(row) {
      this.id = String(row.id);
      this.title = row.title;
      this.length = String(row.length);
    }

    static async insert({ title, length }) {
      const { rows } = await pool.query(
        'INSERT INTO chapters(title, length) VALUES ($1, $2) RETURNING *',
        [title, length] 
      );

      return new Chapter(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query('SELECT * FROM chapters');
  
      return rows.map(row => new Chapter(row));
    }
  
    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM chapters WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No book with id ${id}`);
      return new Chapter(rows[0]);
    }
  
    static async update(id, { title, length }) {
      const { rows } = await pool.query(
        `UPDATE chapters 
          SET title=$1,
              length=$2
          WHERE id=$3
          RETURNING *
        `,
        [title, length, id]
      );
  
      return new Chapter(rows[0]);
    }
  
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM chapters WHERE id=$1 RETURNING *',
        [id]
      );
  
      return new Chapter(rows[0]);
    }
};
  
