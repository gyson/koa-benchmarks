'use strict';

var Koa = require('koa');

var app = new Koa();

app.experimental = true

var n = parseInt(process.env.MW || '1', 10);

while (n--) {
  app.use(function (ctx, next) {
    return next()
  });
}

var body = new Buffer('Hello World');

app.use(function (ctx) {
  ctx.body = body;
});

app.listen(3333);
