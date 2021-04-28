const cron = require('node-cron');
const { getAllMealPreference } = require('./../service/meal-pref');
const { insertMealFromPreference } = require('../service/meal');

const generateMeal = async () => {
  const preferences = await getAllMealPreference();
  for (let i = 0; i < preferences.length; i++) {
    const pref = preferences[i];

    console.log('inserting meal from pref');
    await insertMealFromPreference(pref);
  }
};

const generateMealCron = () => {
  cron.schedule('4 13 * * *', generateMeal);
};

module.exports = {
  generateMealCron,
};

// Task: Insert data in meal table
// - fetch all users meal preference;
// - define a function that takes a preference object and inserts a meal
// - call that function for every meal preference
