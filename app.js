
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('db-uri', 'mongodb://localhost/dongwon');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir: __dirname + '/tmp/upload'}));
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// reference
// https://github.com/alexyoung/nodepad/blob/master/app.js
//var db = mongoose.connect(app.set('db-uri'));

//function mongoStoreConnectionArgs() {
//  return { dbname: db.db.databaseName, 
//           host: db.db.serverConfig.host,
 //          post: db.db.serverConfig.port,
 //          username: db.uri.username,
 //          password: db.uri.password };
//}

//app.use(express.session({
//  store: mongoStore(mongoStoreConnectionArgs())
//}));

app.get('/dongwon', routes.index);
app.get('/dongwon/shop/list', routes.shop.list);
app.get('/dongwon/shop/edit/:id', routes.shop.edit);
app.post('/dongwon/shop/edit/:id', routes.shop.update);
app.post('/dongwon/shop/new', routes.shop.insert);
app.post('/dongwon/shop/remove', routes.shop.remove);

app.get('/dongwon/notice/list', routes.notice.list);
app.get('/dongwon/notice/edit/:id', routes.notice.edit);
app.post('/dongwon/notice/edit/:id', routes.notice.update);
app.post('/dongwon/notice/new', routes.notice.insert);
app.get('/dongwon/notice/detail/:id', routes.notice.detail);
app.post('/dongwon/notice/remove', routes.notice.remove);

app.get('/dongwon/qna/list', routes.qna.list);
app.get('/dongwon/qna/edit/:id', routes.qna.edit);
app.post('/dongwon/qna/edit/:id', routes.qna.update);
app.post('/dongwon/qna/new', routes.qna.insert);
app.get('/dongwon/qna/detail/:id', routes.qna.detail);
app.post('/dongwon/qna/remove', routes.qna.remove);

app.get('/dongwon/good/list', routes.good.list);
app.get('/dongwon/good/edit/:id', routes.good.edit);
app.post('/dongwon/good/edit/:id', routes.good.update);
app.post('/dongwon/good/new', routes.good.insert);
app.get('/dongwon/good/detail/:id', routes.good.detail);
app.post('/dongwon/good/remove', routes.good.remove);

app.get('/dongwon/upload', routes.upload.get);
app.post('/dongwon/upload', routes.upload.post);

app.get('/session', function(req, res) {
  req.session.message = "Hello World";
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
