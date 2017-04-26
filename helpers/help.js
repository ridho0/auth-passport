const jwt = require('jsonwebtoken');
const db = require('../models')

module.exports = {
  auth: function(req, res, next) {
    jwt.verify(req.headers.token, 'secret', function(err, decoded) {
      if (decoded) {
        next()
      } else {
        res.send('You must login!')
      }
    })
  }
}
// require('dotenv').config()

// const helpers = {}
//
// helpers.isUnique = function(req, res, next) {
//   db.Contact.findOne({ where: {user_name:req.body.user_name} })
//     .then(user => {
//       if( user ) {
//         res.send("user sudah ada")
//       } else {
//         next()
//       }
//     })
// }
//
//   helpers.isAdmin = function(req, res, next) {
//     jwt.verify(req.headers.token, 'secret',
//     function(err, decoded) {
//       if(decoded) {
//         if(decoded.role == 'admin'){
//           next()
//         } else {
//           res.send("you can't access this data")
//         }
//       } else {
//         res.send(err)
//       }
//     })
//   }
//
//   helpers.isLogin = function(req, res, next) {
//     jwt.verify(req.headers.token, 'secret',
//     function(err, decoded) {
//       if(decoded) {
//         if(decoded.role == 'admin' || (decoded.role == 'user' && decoded.id == req.params.id)){
//           next()
//         } else {
//           res.send("you can't access this data")
//         }
//       } else {
//         res.send(err)
//       }
//     })
//   }
// module.exports = helpers
