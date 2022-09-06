var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const bodyParser = require('body-parser')
const ejs = require('ejs');
const fs = require('fs')
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'howchu-db.mysql.database.azure.com',
  user: 'OkamotoHaruki',
  password: 'Sniper159357',
  database: 'howchudb',
  port:3306,
  // ssl:{ca:fs.readFileSync("{ca-cert DigiCertGlobalRootCA.crt.pem}")}
});

// const port = 3000;
// -----------------------------------

var app = express();

// var NowStationRouter = require('./routes/NowStation');
// app.use('/NowStation',NowStationRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('ejs', ejs.renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//express session　設定
var session_opt = {
  secret: 'keybord cat',
  resave: false,
  saveUninitialized: false,
  cokkie: {maxAge: 60 * 60 * 1000}
}
app.use(session(session_opt));

//database connect
con.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

//rooting
var txt = 0;
app.get('/', (req, res) => {
  res.render('login.ejs',{error:txt});
}
);

app.get('/NowStation',(req,res) => {
  res.render('NowStation.ejs');
}
);

app.get('/ChangeStation',(req,res) => {
  res.render('ChangeStation.ejs');
}
);

app.get('/kemopo',(req,res) => {
  res.render('kemopo.ejs');
}
);


// //session保存
//login処理
app.post('/session', (req, res) => {
 //POSTで送信された値を格納
  var mail = req.body['mail'];
 //セッションにmailの値を保存
  req.session.mail = mail;
  var login = req.body['password'];
  req.session.password = login;

  //DBとパスワード照合
  var password = con.query("SELECT `password` FROM users where `mail` = ?",[req.session.mail],function(err, rows, fields) {
    if (err) {
      console.log('can not connect');
      console.log(err);
      return;
    }
    for (var i in rows) {
      password = rows[i].password;
    }
  if(password == login){
    //res.redirect('[/home]');
    res.redirect('/index');
  } else {
    res.redirect('/');
  }
})
});

//情報表示
// app.get(「'/home'」, (req, res) => {
app.get('/index', (req, res) => {
  con.query(
    'SELECT address,dep_station,des_station FROM users where `mail` = ?',[req.session.mail],
    (error, results) => {
      console.log(results);
      // res.render('home.ejs',{text:results})
      res.render('index.ejs',{text:results})
    }
  )
});

// app.get('/NowStation', (req, res) => {
//   con.query(
//     'SELECT dep_station,des_station FROM users where `mail` = ?',[req.session.mail],
//     (error, results) => {
//       console.log(results);
//       // res.render('home.ejs',{text:results})
//       res.render('NowStation.ejs',{text:results})
//     }
//   )
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// app.listen(port, ()=> console.log(port+"サーバー起動"))
module.exports = app;
