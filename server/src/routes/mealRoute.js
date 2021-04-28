const express = require('express');
const pool = require('../db');
const app = express();
const router = express.Router();
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

//create a meal

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMeal = await pool.query(
      'INSERT INTO meal(user_id, breakfast, lunch, dinner) VALUES($1, $2, $3,$4) RETURNING *',
      [data.user_id, data.breakfast, data.lunch, data.dinner],
    );

    res.json(newMeal.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all meals
router.get('/', async (req, res) => {
  try {
    console.log('From mealRoute session user: ', req.session.user);
    const allMeal = await pool.query(
      'SELECT * FROM meal inner join users on users.user_id = meal.user_id inner join usermess on usermess.user_id = users.user_id where usermess.mess_id = $1 and users.user_id = $2 ',
      [req.session.mess.mess_id, req.session.user.user_id],
    );
    res.json(allMeal.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a meal
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aMeal = await pool.query('SELECT * FROM meal WHERE meal_id = $1', [
      id,
    ]);
    res.json(aMeal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a meal
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await pool.query(
      'UPDATE meal SET user_id= $1, breakfast = $2, lunch = $3, dinner = $4 WHERE meal_id = $5 RETURNING *',
      [data.user_id, data.breakfast, data.lunch, data.dinner, id],
    );
    res.json('updated!!');
  } catch (err) {
    console.error(err.message);
  }
});

//delete a meal
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM meal WHERE meal_id = $1', [id]);
    res.json('Deleted!!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
