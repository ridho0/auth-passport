var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passwordHash = require('password-hash')

const passport = require('passport')
let Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {
    let db = require('./models')
    db.Contact.findOne({where: { user_name: username } })
      .then(user => {
        if (passwordHash.verify(password, user.password)) {
          cb(null, user)
        } else {
          cb('wrong password !')
        }
      })
      .catch(err => {
        cb(err)
      })
  }
))
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(passport.initialize())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000)

module.exports = app;
