
## info

    Time:       Thu Sep 10 2015 16:22:48 GMT-0400 (EDT)
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
| [koa-next-as-wrapper/async-await.js](koa-next-as-wrapper/async-await.js) | `await next` | 9151.10 | 5786.66 | 4433.47 | 3317.40 | 2735.02 |
| [koa-next-as-function/async-await.js](koa-next-as-function/async-await.js) | `await next(context)` | 9476.57 | 7398.28 | 5941.66 | 5566.85 | 4568.25 |
| [koa-next-as-wrapper/generator-yield.js](koa-next-as-wrapper/generator-yield.js) | `return yield next` | 8864.06 | 5177.71 | 3774.31 | 2748.92 | 2009.24 |
| [koa-next-as-wrapper/generator-delegate.js](koa-next-as-wrapper/generator-delegate.js) | `return yield* next` | 9250.69 | 8584.95 | 7690.87 | 7116.65 | 6762.71 |
| [koa-next-as-function/function-return.js](koa-next-as-function/function-return.js) | `return next(context)` | 10448.54 | 9952.85 | 9690.27 | 9800.95 | 9537.92 |
