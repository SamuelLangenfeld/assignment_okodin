var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
let Profile = models.Profile;
var sequelize = models.sequelize;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findAll({include: [{model: Profile}]})
    .then(users => {
      let arrayOne = [];
      users.map((user, i) => {
        arrayOne[Math.floor(i / 3)] = arrayOne[Math.floor(i / 3)] || [];
        arrayOne[Math.floor(i / 3)][i % 3] = user;
      });
      res.render('usersIndex', {arrayOne});
    })
    .catch(e => {
      console.error(e);
    });
});

router.get('/:id', function(req, res, next) {
  User.findById(Number(req.params.id), {include: [{model: Profile}]})
    .then(user => {
      res.render('user', {user});
    })
    .catch(e => {
      console.error(e);
    });
});

router.post('/', function(req, res, next) {
  let params = {};
  console.log('gender is ' + req.body.gender);
  console.log(req.body);
  if (req.body.gender) {
    params['gender'] = req.body.gender;
  }

  if (req.body.age) {
    if (req.body.age === 'under100') {
      params['age'] = {$lt: 100};
    }
    if (req.body.age === '100') {
      params['age'] = 100;
    }
    if (req.body.age === 'over100') {
      params['age'] = {$gt: 100};
    }
  }

  let maritalArray = [];
  if (req.body.single) {
    maritalArray.push({marital: req.body.single});
  }
  if (req.body.married) {
    maritalArray.push({marital: req.body.married});
  }
  if (req.body.dating) {
    maritalArray.push({marital: req.body.dating});
  }
  if (maritalArray.length) {
    params['$or'] = maritalArray;
  }
  User.findAll({
    include: [{model: Profile, where: params}],
  }).then(users => {
    let arrayOne = [];
    users.map((user, i) => {
      arrayOne[Math.floor(i / 3)] = arrayOne[Math.floor(i / 3)] || [];
      arrayOne[Math.floor(i / 3)][i % 3] = user;
    });
    res.render('usersIndex', {arrayOne});
  });
});

router.get('/:id/edit', function(req, res, next) {
  User.findById(Number(req.params.id), {include: [{model: Profile}]})
    .then(user => {
      res.render('editUser', {user});
    })
    .catch(e => {
      console.error(e);
    });
});
router.post('/:id/edit', function(req, res, next) {
  let userObj = {};
  let profileObj = {};
  userObj.fname = req.body.fname;
  userObj.lname = req.body.lname;
  userObj.username = req.body.username;
  userObj.email = req.body.email;
  userObj.id = req.params.id;
  profileObj.description = req.body.description;
  profileObj.talents = req.body.talents;
  profileObj.favorites = req.body.favorites;
  profileObj.why = req.body.why;
  profileObj.gender = req.body.gender;
  profileObj.marital = req.body.marital;
  profileObj.height = req.body.height;
  profileObj.body = req.body.body;
  profileObj.kids = req.body.kids;
  profileObj.occupation = req.body.occupation;
  profileObj.age = req.body.age;

  User.update(userObj, {where: {id: req.params.id}})
    .then(x => {
      Profile.update(profileObj, {where: {userId: req.params.id}}).then(x => {
        res.redirect(`/users/${req.params.id}`);
      });
    })
    .catch(e => {
      e.status = 404;
      next(e);
    });
});

module.exports = router;
