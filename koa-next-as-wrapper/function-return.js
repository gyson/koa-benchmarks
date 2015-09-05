'use strict';

var koa = require('./lib/application'); // koa-master && composition 2.2.1
var app = koa();

app.experimental = true

var n = parseInt(process.env.MW || '1', 10);

while (n--) {
  app.use(function (next){
    return next;
  });
}

var body = new Buffer('Hello World');

app.use(function (next){
  this.body = body;
});

app.listen(3333);
