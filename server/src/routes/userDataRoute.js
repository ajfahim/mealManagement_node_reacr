const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log(req.session.mess);
    const user = await pool.query(
      'SELECT name, is_manager FROM users WHERE user_id = $1',
      [req.session.user.user_id],
    );
    console.log(user.rows[0]);
    const messId = await pool.query(
      'SELECT mess_id FROM usermess WHERE user_id = $1',
      [req.session.user.user_id],
    );
    console.log(messId.rows[0].mess_id);
    const mess = await pool.query('SELECT * FROM mess WHERE mess_id = $1', [
      messId.rows[0].mess_id,
    ]);
    const userData = {
      user_id: req.session.user.user_id,
      userName: user.rows[0].name,
      is_manager: user.rows[0].is_manager,
      mess_id: messId.rows[0].mess_id,
      mess: mess.rows[0].name,
      address: mess.rows[0].address,
    };

    console.log('Backend,userData Route: ', userData);
    res.json(userData);
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
