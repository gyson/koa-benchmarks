
## info

    Time:       Wed Oct 14 2015 11:14:06 GMT-0400 (EDT)
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
| [koa-v1/generator-yield.js](koa-v1/generator-yield.js) | `return yield next` | 8857.41 | 5233.39 | 3015.67 | 2493.12 | 1911.04 |
| [koa-v2/generator-yield.js](koa-v2/generator-yield.js) | `return yield next` | 6849.76 | 3081.89 | 1866.13 | 1225.90 | 1013.04 |
| [koa-v1/generator-delegate.js](koa-v1/generator-delegate.js) | `return yield* next` | 8558.56 | 7716.71 | 7255.56 | 6999.12 | 6607.64 |
| [koa-v2/generator-delegate.js](koa-v2/generator-delegate.js) | `return yield* next` | 8322.36 | 4315.76 | 2674.76 | 1895.26 | 1565.88 |
| [koa-v2/async-await.js](koa-v2/async-await.js) | `await next()` | 8828.56 | 6833.06 | 5761.39 | 4885.25 | 4094.74 |
| [koa-v2/function-return.js](koa-v2/function-return.js) | `return next()` | 9452.22 | 9189.66 | 8686.99 | 8623.90 | 8288.49 |

