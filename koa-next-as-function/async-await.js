'use strict';

var koa = require('./lib/application');
var app = koa();

app.experimental = true

var n = parseInt(process.env.MW || '1', 10);

while (n--) {
  app.use(async function (next){
    await next(this);
  });
}

var body = new Buffer('Hello World');

app.use(async function (next){
  this.body = body;
});

app.listen(3333);
