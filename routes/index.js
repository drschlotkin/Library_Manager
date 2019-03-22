const express = require('express');
const router = express.Router();

// Redirect to home page

router.get('/', (req, res) => {
    res.redirect('/books')
  });
  
module.exports = router;
  