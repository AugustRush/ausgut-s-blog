var express = require('express');
var app = express();
var path = require('path');
var nunjucks = require('nunjucks');
var session = require('express-session');
var mongoDB = require('connect-mongo')(session);
var config = require('config-lite')(__dirname);
var routers = require('./routers');
var pkg = require('./package');
var flash = require('connect-flash');

//set template path to ./views
var views_path = path.join(__dirname,'views');
app.set('views',views_path);
nunjucks.configure(views_path,{
    autoescape: true,
    cache: false,
    express: app
});
app.engine('html',nunjucks.render);
//set view engine to html
app.set('view engine','html');
//set statis files doc
app.use(express.static(path.join(__dirname,'public')));
// set session middlewares
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new mongoDB({// 将 session 存储到 mongodb
      url: config.mongodb// mongodb 地址
    })
}));
// flash 中间件，用来显示通知
app.use(flash());
// 路由
routers(app);
//listen to port 3000
// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});