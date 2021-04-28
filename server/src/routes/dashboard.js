const express = require('express');
const router = express.Router();
const pool = require('../db');
const { DateTime } = require('luxon');

router.get('/', async (req, res) => {
  try {
    //Meal for Today

    console.log(DateTime.local().toFormat('yyyy-MM-dd'));
    const query = `select * from meal 
    inner join users on meal.user_id= users.user_id 
    inner join usermess on usermess.user_id = users.user_id 
    where  date::date = $1 and mess_id = $2`;

    const result = await pool.query(query, [
      DateTime.local().toFormat('yyyy-MM-dd'),
      req.session.mess.mess_id,
    ]);
    console.log('rows = ', result.rows);
    const todaysMeal = result.rows.reduce(
      (acc, curr) => {
        return {
          lunch: acc.lunch + curr.lunch,
          dinner: acc.dinner + curr.dinner,
          breakfast: acc.breakfast + curr.breakfast,
        };
      },
      {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      },
    );
    console.log('Todays meal rows = ', todaysMeal);

    //Meal consumed by me
    const mealConsumed = (
      await pool.query('select * from meal where user_id = $1', [
        req.session.user.user_id,
      ])
    ).rows.reduce(
      (acc, curr) => {
        return {
          lunch: acc.lunch + curr.lunch,
          dinner: acc.dinner + curr.dinner,
          breakfast: acc.breakfast + curr.breakfast,
        };
      },
      {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      },
    );
    console.log('meal Consumed: ', mealConsumed);
    const totalMealConsumedByMe =
      mealConsumed.breakfast + mealConsumed.lunch + mealConsumed.dinner;
    console.log('TOtal Meal: ', totalMealConsumedByMe);

    //My deposit
    const myDeposit = (
      await pool.query('select amount from transaction where user_id = $1 ', [
        req.session.user.user_id,
      ])
    ).rows.reduce(
      (acc, curr) => {
        return {
          amount: parseFloat(acc.amount) + parseFloat(curr.amount),
        };
      },
      {
        amount: 0,
      },
    );
    console.log('myDeposit: ', myDeposit);

    //Total Bazar

    const totalBazar = (
      await pool.query(
        'select * from bazar inner join users on users.user_id = bazar.user_id inner join usermess on users.user_id = usermess.user_id where mess_id = $1',
        [req.session.mess.mess_id],
      )
    ).rows.reduce(
      (acc, curr) => {
        return { amount: parseFloat(acc.amount) + parseFloat(curr.amount) };
      },
      { amount: 0 },
    );
    console.log('total Bazar: ', totalBazar);

    //Total meal of mess
    const totalMeal = (
      await pool.query(
        'select * from meal inner join users on users.user_id = meal.user_id inner join usermess on usermess.user_id = users.user_id where mess_id = $1',
        [req.session.mess.mess_id],
      )
    ).rows.reduce(
      (acc, curr) => {
        return {
          lunch: acc.lunch + curr.lunch,
          dinner: acc.dinner + curr.dinner,
          breakfast: acc.breakfast + curr.breakfast,
        };
      },
      {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      },
    );
    const totalMealOfMess =
      totalMeal.lunch + totalMeal.breakfast + totalMeal.dinner;
    console.log('Total Meal of Mess: ', totalMealOfMess);
    res.json({
      data: {
        todaysMeal,
        totalMealConsumedByMe,
        myDeposit,
        totalBazar,
        totalMealOfMess,
      },
    });
  } catch (error) {
    console.log('error', error);
    res.json('error');
  }
});

module.exports = router;
