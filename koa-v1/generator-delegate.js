'use strict';

var koa = require('koa-v1');
var app = koa();

var n = parseInt(process.env.MW || '1', 10);

while (n--) {
  app.use(function* (next){
    return yield* next;
  });
}

var body = new Buffer('Hello World');

app.use(function* (next){
  this.body = body;
});

app.listen(3333);
