var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/sendmessage', function (req, res) {
  res.render('sendmessage')
})

module.exports = router;