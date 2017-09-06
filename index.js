var express = require('express');
var app = express();
var index_router = require('./routers/index');
var user_router = require('./routers/users');
var path = require('path');
var nunjucks = require('nunjucks');

//set template path to ./views
app.set('views',path.join(__dirname,'views'));
nunjucks.configure(path.join(__dirname,'views'),{
    autoescape: true,
    cache: false,
    express: app
});
app.engine('html',nunjucks.render);
//set view engine to html
app.set('view engine','html');
//use router
app.use('/', index_router);
app.use('/users', user_router);
//listen to port 3000
app.listen(3000);