var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var liufeiRouter = require('./routes/liufei');
var wangqinbingRouter = require('./routes/wangqinbing');
var xiajingRouter = require('./routes/xiajing');
var zhangyuanRouter = require('./routes/zhangyuan');
var xiongweiRouter = require('./routes/xiongwei');
var zhaoqinglongRouter = require('./routes/zhaoqinglong');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'bingo',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 * 24 * 7 }
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/liufei', liufeiRouter);
app.use('/wangqinbing', wangqinbingRouter);
app.use('/xiajing', xiajingRouter);
app.use('/xiongwei', xiongweiRouter);
app.use('/zhangyuan', zhangyuanRouter);
app.use('/zhaoqinglong', zhaoqinglongRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("error:",err);
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
