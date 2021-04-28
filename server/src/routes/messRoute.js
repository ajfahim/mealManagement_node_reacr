const express = require('express');
const pool = require('../db');
const app = express();
const router = express.Router();
const cors = require ('cors');


//middleware
app.use(cors())
app.use(express.json());

//create a mess

router.post('/', async (req, res)=>{
   
    try {
        const data = req.body;
        const newMess = await pool.query('INSERT INTO mess(name, address) VALUES($1, $2) RETURNING *',
        [data.name, data.address]);
    
        res.json(newMess.rows);
    } catch (err) {
        console.error(err.message);
    }

})

//get all preference
router.get('/', async (req,res)=>{
    try {
        const allPreference = await pool.query("SELECT * FROM meal_preference");
        res.json(allPreference.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a preference
router.get('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const aPreference = await pool.query("SELECT * FROM meal_preference WHERE preference_id = $1",[id]);
        res.json(aPreference.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a preference
router.put('/:id', async (req, res)=>{
    try {
        
        const data = req.body;
        const {id} = req.params;
        await pool.query("UPDATE meal_preference SET user_id= $1, breakfast = $2, lunch = $3, dinner = $4 WHERE preference_id = $5 RETURNING *",
        [data.user_id, data.breakfast, data.lunch, data.dinner,id]);
        res.json("updated!!")
        
    } catch (err) {
        console.error(err.message);
    }
})

//delete a preference
router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM meal_preference WHERE preference_id = $1",[id])
        res.json("Deleted!!")
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router