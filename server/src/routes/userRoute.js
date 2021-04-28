//const Router  = require('express');
const express = require('express');
const pool = require('../db');
const router = express.Router();

//create a user

router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const newUser = await pool.query(
      'INSERT INTO users (phone, name, is_manager, email, password) values($1, $2, $3, $4, $5) RETURNING *',
      [data.phone, data.name, data.is_manager, data.email, data.password],
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all users

router.get('/', async (req, res) => {
  // console.log('session = ', req.session)

  try {
    const allUsers = await pool.query(
      'SELECT name, phone, email FROM users INNER JOIN usermess on users.user_id = usermess.user_id where mess_id = $1',
      [req.session.mess.mess_id],
    );
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a user

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aUsers = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      id,
    ]);
    res.json(aUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a user

router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const updateUser = await pool.query(
      'UPDATE users SET phone = $1, name = $2, is_manager = $3, email =$4, password = $5 WHERE user_id = $6 RETURNING *',
      [data.phone, data.name, data.is_manager, data.email, data.password, id],
    );
    res.json('Updated!!');
    res.json(updateUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
    res.json('deleted!!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
