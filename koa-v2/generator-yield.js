'use strict';

var Koa = require('koa');
var app = new Koa();

var n = parseInt(process.env.MW || '1', 10);

while (n--) {
  app.use(function* (next){
    return yield next;
  });
}

var body = new Buffer('Hello World');

app.use(function* (next){
  this.body = body;
});

app.listen(3333);
