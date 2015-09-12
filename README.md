## info

    Time:       Sat Sep 12 2015 11:38:20 GMT-0400 (EDT)
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
| [koa-next-as-wrapper/async-await.js](koa-next-as-wrapper/async-await.js) | `await next` | 9365.78 | 6002.49 | 4108.62 | 3395.11 | 2847.12 |
| [koa-next-as-function/async-await.js](koa-next-as-function/async-await.js) | `await next(context)` | 9482.34 | 7606.19 | 5670.14 | 5537.89 | 4662.42 |
| [koa-next-as-wrapper/generator-yield.js](koa-next-as-wrapper/generator-yield.js) | `return yield next` | 8847.43 | 5383.50 | 3525.02 | 2819.64 | 2097.64 |
| [koa-next-as-wrapper/generator-delegate.js](koa-next-as-wrapper/generator-delegate.js) | `return yield* next` | 9239.38 | 8456.71 | 7892.68 | 7193.02 | 6867.81 |
| [koa-next-as-function/function-return.js](koa-next-as-function/function-return.js) | `return next(context)` | 10206.70 | 10185.36 | 10109.08 | 9923.81 | 9759.48 |
