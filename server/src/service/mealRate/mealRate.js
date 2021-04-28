const pool = require('../../db');

async function calculateMealRate(messId) {
  //Total Bazar

  const totalBazar = (
    await pool.query(
      'select * from bazar inner join users on users.user_id = bazar.user_id inner join usermess on users.user_id = usermess.user_id where mess_id = $1',
      [messId],
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
      [messId],
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
  console.log('total meal of mess: ', totalMealOfMess);
  const mealRate = totalBazar.amount / totalMealOfMess;
  return mealRate;
}

module.exports = {
  calculateMealRate,
};
