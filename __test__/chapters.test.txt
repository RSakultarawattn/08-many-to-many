const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app.js');


describe('chapters routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });
  
  it('create a new chapter via POST', async() => {
    const response = await request(app)
      .post('/api/v1/chapters')
      .send({
        title: 'cowhide'
      });
  
    expect(response.body).toEqual({
      id: '1',
      title: 'cowhide'
    });
  });
});
  
