const Pool = require('pg').Pool;

const types = require('pg').types;

const pool = new Pool({
  user: 'fahim',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'mealmanagerdb',
});

module.exports = pool;
