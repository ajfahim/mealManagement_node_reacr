const express = require('express');
const pool = require('../db');
const router = express.Router();
const { calculateMealRate } = require('../service/mealRate/mealRate');
const { DateTime } = require('luxon');

router.get('/', async (req, res) => {
  try {
    const mealRate = await calculateMealRate(req.session.mess.mess_id);
    //const mealRate = 30;
    console.log('mealRate: ', mealRate);
    console.log('typeof meal rate', typeof mealRate);
    console.log('messId :', req.session.mess.mess_id);
    const query = `select
    usermess.mess_id,
    users.user_id,
    users.name,
    SUM(breakfast) as totalBreakfast,
    SUM(lunch)  as totalLunch,
    SUM(dinner) as totalDinner,
    (SUM(breakfast) + SUM(lunch) + SUM(dinner)) as totalMeal,
    coalesce(MAX(tt.total_amount), 0) as total_amount,
    (SUM(breakfast)+ SUM (lunch) +SUM (dinner)) * $1::float8 as cost,
    (coalesce(MAX(tt.total_amount), 0)) - (SUM(breakfast) + SUM(lunch) + SUM(dinner)) * $1::float8 as balance
from users
      INNER JOIN usermess on usermess.user_id = users.user_id
      INNER JOIN meal on meal.user_id = users.user_id
      LEFT JOIN (
 select user_id, SUM(amount) as total_amount
 from transaction
 where transaction_type = 'deposit'
        AND transaction_date between $2 AND NOW()
 group by user_id
) tt ON tt.user_id = users.user_id

where meal.date between $2 AND NOW()
group by users.user_id, usermess.mess_id
having usermess.mess_id = $3
`;
    const data = await pool.query(query, [
      mealRate,
      '2021-01-01',
      req.session.mess.mess_id,
    ]);
    // res.json(name.rows);

    res.json(data.rows);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
