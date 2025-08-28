require('dotenv').config(); // load env first
const { Pool } = require('pg');

const connectionString =
  process.env.NODE_ENV === 'test'
    ? process.env.DB_TEST_URL
    : process.env.DB_URL;

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Using DB URL:', connectionString);

const db = new Pool({ connectionString });

const closeDB = async () => {
  await db.end();
};

module.exports = { db, closeDB };
