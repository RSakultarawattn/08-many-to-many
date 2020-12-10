const pool = require('../utils/pool');


module.exports = class Chapter {
    id;
    title;
    
    

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      
    }

    static async insert({ title }) {
      const { rows } = await pool.query(
        'INSERT INTO chapters(title) VALUES ($1) RETURNING *',
        [title] 
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
      if(!rows[0]) throw new Error(`No chapter with id ${id}`);
      return new Chapter(rows[0]);
    }
  
    static async update(id, { title }) {
      const { rows } = await pool.query(
        `UPDATE chapters 
          SET title=$1
          WHERE id=$2
          RETURNING *
        `,
        [title, id]
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
  
