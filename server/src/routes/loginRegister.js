const pool = require('../db');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req, res) => {
  try {
    const data = req.body;

    console.log('From loginregister Route: ', data);

    //check if the user exists (If the user exists throw error)
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      data.email,
    ]);
    if (user.rows.length === 0) {
      //bcrypt password
      const hassedPassword = await bcrypt.hash(data.password, 10);

      //insert into database
      const newUser = await pool.query(
        'INSERT INTO users (phone, name, is_manager, email, password) values($1, $2, $3, $4, $5) RETURNING *',
        [data.phone, data.name, false, data.email, hassedPassword],
      );

      if (data.messId) {
        console.log('from if condition');
        const newuserMess = await pool.query(
          'INSERT INTO usermess (user_id, mess_id) values ($1,$2) RETURNING *',
          [newUser.rows[0].user_id, data.messId],
        );
      } else {
        console.log('from else condition');
        const newMess = await pool.query(
          'INSERT INTO mess (name, address) values ($1,$2) RETURNING *',
          [data.messName, data.messAddress],
        );
        const newuserMess = await pool.query(
          'INSERT INTO usermess (user_id, mess_id) values ($1,$2) RETURNING *',
          [newUser.rows[0].user_id, newMess.rows[0].mess_id],
        );
      }

      res.json(data);
      res.json('successfull');
    } else res.json('user already exists');
  } catch (err) {
    console.error(err.message);
  }
});

//Login

router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    //check if the user exists or not
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      data.email,
    ]);
    console.log(user.rows[0]);
    const mess = await pool.query('select * from usermess where user_id = $1', [
      user.rows[0].user_id,
    ]);
    console.log('mess: ', mess.rows[0]);

    if (user.rows.length !== 0) {
      //check user password with database password
      const validPassword = await bcrypt.compare(
        data.password,
        user.rows[0].password,
      );
      if (validPassword) {
        //give token
        // const token = jwtGenerator(user.rows[0].user_id);
        req.session.user = user.rows[0];
        req.session.mess = mess.rows[0];
        console.log('In Ssession: ', req.session.mess);
        console.log('In Session: ', req.session.user);
        console.log(req.cookies);
        res.status(200).json('loggedin');
      } else {
        res.status(401).json('Your password does not match');
      }
    } else {
      res.status(401).json('User does not exists!!');
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
