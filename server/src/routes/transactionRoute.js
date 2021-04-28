//const Router  = require('express');
const express = require('express');
const pool = require('../db');
const app = express();
const router = express.Router();

//middleware

app.use(express.json());

//create a transaction

router.post('/', async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    const newTransaction = await pool.query(
      'INSERT INTO transaction (user_id, amount, transaction_type) values($1, $2, $3) RETURNING *',
      [req.session.user.user_id, data.amount, data.transaction_type],
    );
    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all Transaction

router.get('/', async (req, res) => {
  try {
    const allTransaction = await pool.query(
      'SELECT transaction.*, u.name FROM transaction inner join users u on transaction.user_id = u.user_id where u.user_id = $1',
      [req.session.user.user_id],
    );
    console.log('transactions = ', allTransaction);
    res.json(allTransaction.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a Transaction

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aTransaction = await pool.query(
      'SELECT * FROM transaction WHERE transaction_id = $1',
      [id],
    );
    res.json(aTransaction.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a Transaction

router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const updateTransaction = await pool.query(
      'UPDATE transaction SET user_id = $1, amount = $2, transaction_type = $3 WHERE transaction_id = $4 RETURNING *',
      [data.user_id, data.amount, data.transaction_type, id],
    );
    res.json('Updated!!');
    res.json(updateTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete aTransaction
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM bazar WHERE transaction_id = $1', [id]);
    res.json('deleted!!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
