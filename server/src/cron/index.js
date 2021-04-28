const { generateMealCron } = require('./generate-meal-entry');

const registerCronJobs = () => {
  generateMealCron();
};

module.exports = {
  registerCronJobs,
};
