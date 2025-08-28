require('dotenv').config(); 
const { db } = require('../../db/connect'); // import db from new connect.js
const fs = require('fs');

const resetSQL = fs.readFileSync(__dirname + '/reset.sql').toString();

const resetTestDB = async () => {
  try {
    await db.query(resetSQL);
    console.log('Test DB reset successfully');
  } catch (err) {
    console.error('Could not reset TestDB:', err);
    throw err;
  }
};

const closeDB = async () => {
  const { closeDB } = require('../../db/connect'); // import closeDB helper
  await closeDB();
};

module.exports = { resetTestDB, closeDB };
