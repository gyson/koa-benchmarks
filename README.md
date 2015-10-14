
## info

    Time:       Wed Oct 14 2015 10:36:51 GMT-0400 (EDT)
    Machine:    darwin, x64, Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz x 8
    Nodejs:     4.2.0
    V8:         4.5.103.35

## note

* all tests use `Bluebird` as Promise polyfill
* all tests with async-await function will be transfered to `Bluebird.coroutine` by babeljs

## bench middleware

use `wrk` to test the Requests/sec (higher is better) for 1, 25, 50, 75, 100 noop middleware.

| filename | API | 1 | 25 | 50 | 75 | 100 |
|:---------|----:|--:|---:|---:|---:|----:|
| [koa-v1/generator-yield.js](koa-v1/generator-yield.js) | `return yield next` | 9127.64 | 5283.83 | 3670.08 | 2868.57 | 2211.17 |
| [koa-v1/generator-delegate.js](koa-v1/generator-delegate.js) | `return yield* next` | 9397.57 | 8693.01 | 7689.43 | 7299.58 | 6849.78 |
| [koa-v2/async-await.js](koa-v2/async-await.js) | `await next()` | 9582.61 | 7302.02 | 6005.97 | 5143.27 | 4248.21 |
| [koa-v2/function-return.js](koa-v2/function-return.js) | `return next()` | 9912.12 | 9840.93 | 9512.69 | 9182.31 | 9034.92 |
