var express = require('express');
var router = express.Router();
var models = require("../models");
var User = models.User;
let Profile = models.Profile;
var sequelize = models.sequelize;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll({ include: [{ model: Profile }] }).then(users => {
      let arrayOne = [];
      users.map((user, i) => {
        arrayOne[Math.floor(i / 3)] = arrayOne[Math.floor(i / 3)] || [];
        arrayOne[Math.floor(i / 3)][i % 3] = user;
      })
      res.render('usersIndex', { arrayOne });
    })
    .catch(e => {
      console.error(e);
    })

});

router.get('/:id', function(req, res, next) {
  User.findById(Number(req.params.id), { include: [{ model: Profile }] }).then(user => {
      res.render('user', { user });
    })
    .catch(e => {
      console.error(e);
    })

});

module.exports = router;