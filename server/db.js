const { Pool } = require('pg');

const connectionString =
  process.env.DATABASE_URL || 'postgres://postgres@localhost:5432';
const pool = new Pool({ connectionString });

module.exports = pool;
