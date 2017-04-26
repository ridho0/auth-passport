const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const helpers = require('../helpers/help')

const passport = require('passport');
// let Strategy = require('passport-local').Strategy;
// passport.use(new Strategy(
//   function(username, password, cb) {
//     let db = require('../models')
//     //  db.Contact.findOne({ where: {user_name:req.body.user_name} })
//     db.Contact.findOne({where: { user_name:username } }, function(err, user) {
//       if (err) cb(err)
//       if (passwordHash.verify(password, user.password)) {
//         cb(null, user)
//       } else {
//         cb('wrong password !')
//       }
//     })
//   }
// ))
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signup', userController.signup );
router.post('/signin', passport.authenticate('local', {session: false}), userController.signin );
// router.get('/jwtTest', userController.jwtTest );

router.get('/users', helpers.auth, userController.getAll );
router.get('/users/:id', helpers.auth, userController.getById );
router.post('/users/', helpers.auth, userController.createUser );
router.delete('/users/:id', helpers.auth, userController.deleteById );
router.put('/users/:id', helpers.auth, userController.updateById );

module.exports = router;
