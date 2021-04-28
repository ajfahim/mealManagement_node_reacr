//const Router  = require('express');
const express = require('express');
const pool = require('../db');

const router = express.Router();

//create a bazar

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log('data = ', data);
    console.log('data.bazar_date = ', data.bazar_date);
    const newBazar = await pool.query(
      'INSERT INTO bazar (user_id, amount, bazar_date, description) values($1, $2, $3, $4) RETURNING *',
      [
        req.session.user.user_id,
        data.amount,
        data.bazar_date,
        data.description,
      ],
    );
    res.json(newBazar.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all bazar

router.get('/', async (req, res) => {
  try {
    // res.json(req.session.user.user_id)

    const allBazar = await pool.query(
      ' select bazar.*, users.name ,usermess.mess_id from bazar inner join users  on bazar.user_id = users.user_id inner join usermess on usermess.user_id = users.user_id where mess_id = $1',
      [req.session.mess.mess_id],
    );
    console.log(allBazar.rows);
    res.json(allBazar.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a bazar

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aBazar = await pool.query('SELECT * FROM bazar WHERE bazar_id = $1', [
      id,
    ]);
    res.json(aBazar.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a bazar

router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const updateBazar = await pool.query(
      'UPDATE bazar SET user_id = $1, amount = $2, description = $3 WHERE bazar_id = $4 RETURNING *',
      [data.user_id, data.amount, data.description, id],
    );
    res.json('Updated!!');
    res.json(updateBazar.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM bazar WHERE bazar_id = $1', [id]);
    res.json('deleted!!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
