const pool = require('../../db');

async function insertMealFromPreference(pref) {
  const { user_id, breakfast, lunch, dinner } = pref;
  const stmt =
    'insert into meal (user_id, breakfast, lunch, dinner) values($1, $2, $3, $4)';

  await pool.query(stmt, [user_id, breakfast, lunch, dinner]);
  console.log('meal inserted');
}

module.exports = {
  insertMealFromPreference,
};
