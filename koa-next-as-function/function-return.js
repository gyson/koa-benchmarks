'use strict';

var koa = require('./lib/application');
var app = koa();

app.experimental = true

var n = parseInt(process.env.MW || '1', 10);

while (n--) {
  app.use(function (ctx, next) {
    return next(ctx);
  });
}

var body = new Buffer('Hello World');

app.use((ctx) => {
  ctx.body = body;
});

app.listen(3333);
