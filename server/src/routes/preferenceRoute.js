const express = require('express');
const pool = require('../db');
const app = express();
const router = express.Router();
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

//create a preference

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    //check if data exists for a user
    const check = await pool.query(
      'select * from meal_preference where user_id = $1',
      [data.user_id],
    );
    console.log(check.rows);
    if (check.rows.length < 1) {
      //Insert in db
      const newPreference = await pool.query(
        'INSERT INTO meal_preference(user_id, breakfast, lunch, dinner) VALUES($1, $2, $3,$4) RETURNING *',
        [data.user_id, data.breakfastCount, data.lunchCount, data.dinnerCount],
      );
      res.json(newPreference.rows);
    } else {
      res.status(409).json('cannot set more than one preference or a user');
    }
  } catch (err) {
    console.error(err.message);
  }
});

//get all preference
router.get('/', async (req, res) => {
  try {
    const allPreference = await pool.query(
      'select meal_preference.*, users.name from meal_preference inner join users on meal_preference.user_id = users.user_id inner join usermess on usermess.user_id= users.user_id where mess_id=$1',
      [req.session.mess.mess_id],
    );
    res.json(allPreference.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a preference
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aPreference = await pool.query(
      'SELECT * FROM meal_preference WHERE preference_id = $1',
      [id],
    );
    res.json(aPreference.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a preference
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await pool.query(
      'UPDATE meal_preference SET user_id= $1, breakfast = $2, lunch = $3, dinner = $4 WHERE preference_id = $5 RETURNING *',
      [data.user_id, data.breakfast, data.lunch, data.dinner, id],
    );
    res.json('updated!!');
  } catch (err) {
    console.error(err.message);
  }
});

//delete a preference
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM meal_preference WHERE preference_id = $1', [
      id,
    ]);
    res.json('Deleted!!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
