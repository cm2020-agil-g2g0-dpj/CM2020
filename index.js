// The index.js file of your application
const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
var createError = require('http-errors');
var path = require('path');
const app = express();
const mysql = require("mysql");
const port = 8090;

var expect  = require('chai').expect;
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: '612345abc',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

app.use(flash());
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "plm_db"
});
// Connect to mysql database 
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database");
});

global.db = db;

require("./routes/main")(app);
require("./routes/dashboard")(app);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));




// API LAYER

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


const apiRoutes = require('./routes/api')

app.use('/API', apiRoutes);