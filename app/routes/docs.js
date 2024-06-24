var express = require('express');
var router = express.Router();

router.get('*', function (req, res) {
  res.redirect('/info/alphawarn')
})
module.exports = router
