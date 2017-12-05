var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
let Profile = models.Profile;
var sequelize = models.sequelize;


router.get('/', function(req, res, next) {
  res.render('login');
})

router.post('/', function(req, res, next) {
  User.find({
      where: { username: req.body.username }
    }, { include: [{ model: Profile }] })
    .then(user => {
      res.cookie('userId', user.username);
      res.redirect(`/users/${user.id}`);

    });


})

module.exports = router;