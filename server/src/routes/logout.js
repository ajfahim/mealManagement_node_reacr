const express = require('express');

const router = express.Router();

router.delete('/', (req, res) => {
  try {
    //console.log('Logout: ', req.session);
    req.session.destroy();
    res.clearCookie('__uid__');
    res.status(200).json('Logged out!!');
  } catch (err) {
    console.error(err);
  }
});

// router.delete('/logout', (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         res.status(400).send('Unable to log out');
//       } else {
//         res.send('Logout successful');
//       }
//     });
//   } else {
//     res.end();
//   }
// });
module.exports = router;
