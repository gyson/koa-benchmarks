## info

    Time:       Thu Sep 17 2015 14:43:14 GMT-0400 (EDT)
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
| [koa-next-as-wrapper/async-await.js](koa-next-as-wrapper/async-await.js) | `await next` | 9521.54 | 6318.54 | 4707.04 | 3499.69 | 2754.63 |
| [koa-next-as-function/async-await.js](koa-next-as-function/async-await.js) | `await next()` | 9729.97 | 7493.30 | 6004.42 | 5198.78 | 4624.24 |
| [koa-next-as-wrapper/generator-yield.js](koa-next-as-wrapper/generator-yield.js) | `return yield next` | 9210.96 | 5186.64 | 3780.56 | 2829.59 | 2209.87 |
| [koa-next-as-wrapper/generator-delegate.js](koa-next-as-wrapper/generator-delegate.js) | `return yield* next` | 9336.49 | 8733.02 | 7942.10 | 7256.01 | 6928.06 |
| [koa-next-as-function/function-return.js](koa-next-as-function/function-return.js) | `return next()` | 10084.17 | 9995.48 | 9675.06 | 9462.32 | 9313.42 |
