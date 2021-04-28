const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const user =req.session.user;
        console.log(user);
        res.json(user)
    } catch (err) {
        res.status(403)
        console.error(err.message)
    }
});



module.exports = router