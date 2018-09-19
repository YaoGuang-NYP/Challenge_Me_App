/********Importing Modules***********/

// Basic Core Modules
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*************Importing Controllers****************/
// Controllers
var index = require('./server/controllers/index');

/*****************Initializing Port and Server******************/
var app = express();
var serverPort = 3000;
var httpServer = require('http').Server(app);

/*****************View Engine******************/
app.set("views", path.join(__dirname, "server/views/pages"));
// View Engine EJS Setup
app.set('view engine', "ejs");

/*******************Initializing Middlewares*******************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    des: path.join(__dirname, 'public '),
    indentedSyntax: true,
    sourceMap: true
}));

/******************Public Directory**********************/
//Setup public directory
app.use(express.static(path.join(__dirname, 'public')));

/******************* GET routes ******************/
app.get('/', index.show);
/******************POST routes *******************/

/****************Error Handling*******************/
//Purpose:
//Display Error page 
//No stacktracers leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
});

/*****************************Starting Server********************************/
module.exports = app;

app.set('port', serverPort);

var server  = httpServer.listen(app.get('port'), function() {
    console.log('HTTP Server Is Listening On Port ' + server.address().port);
});