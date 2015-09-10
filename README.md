
## info

    Time:       Thu Sep 10 2015 10:40:38 GMT-0400 (EDT)
    Machine:    darwin, x64, Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz x 8
    Nodejs:     4.0.0
    V8:         4.5.103.30

## note

* all tests use `Bluebird` as Promise polyfill
* all tests with async-await function will be transfered to `Bluebird.coroutine` by babeljs

## bench middleware

use `wrk` to test the Requests/sec (higher is better) for 1, 25, 50, 75, 100 noop middleware.

| filename | API | 1 | 25 | 50 | 75 | 100 |
|:---------|----:|--:|---:|---:|---:|----:|
| [koa-next-as-wrapper/async-await.js](koa-next-as-wrapper/async-await.js) | `await next` | 9109.22 | 6207.21 | 4404.83 | 3443.43 | 2735.76 |
| [koa-next-as-function/async-await.js](koa-next-as-function/async-await.js) | `await next(context)` | 9359.59 | 7570.56 | 6426.93 | 5368.74 | 4828.35 |
| [koa-next-as-wrapper/generator-yield.js](koa-next-as-wrapper/generator-yield.js) | `return yield next` | 8593.41 | 5063.84 | 3331.32 | 2530.32 | 1995.63 |
| [koa-next-as-function/function-return.js](koa-next-as-function/function-return.js) | `return next(context)` | 10230.24 | 10046.31 | 9831.87 | 9728.75 | 9464.74 |
