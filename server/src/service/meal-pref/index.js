const pool = require('../../db');

async function getMealPreferenceById(userid) {
  const stmt = 'select * from meal_preference where user_id = $1';

  const result = pool.query(stmt, [userid]);
  return result.rows;
}

async function getAllMealPreference() {
  const stmt = 'select * from meal_preference';

  const result = await pool.query(stmt);

  return result.rows;
}

module.exports = {
  getMealPreferenceById,
  getAllMealPreference,
};
