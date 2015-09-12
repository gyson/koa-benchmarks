'use strict';

var koa = require('./lib/application');
var app = koa();

app.experimental = true

var n = parseInt(process.env.MW || '1', 10);

while (n--) {
  app.use(async (ctx, next) => {
    await next(ctx);
  });
}

var body = new Buffer('Hello World');

app.use(async (ctx) => {
  ctx.body = body;
});

app.listen(3333);
