## info

    Time:       Sun Sep 06 2015 00:37:28 GMT+0800 (HKT)
    Machine:    darwin, x64, Intel(R) Core(TM) i7-3720QM CPU @ 2.60GHz x 8
    Nodejs:     2.5.0
    V8:         4.2.77.21

## note

* all tests use `Bluebird` as Promise polyfill
* all tests with async-await function will be transfered to `Bluebird.coroutine` by babeljs

## bench middleware

use `wrk` to test the Requests/sec (higher is better) for 1, 25, 50, 75, 100 noop middleware.

| filename | API | 1 | 25 | 50 | 75 | 100 |
|:---------|----:|--:|---:|---:|---:|----:|
| [koa-next-as-wrapper/async-await.js](koa-next-as-wrapper/async-await.js) | `await next` | 9250.79 | 6363.05 | 4824.54 | 3567.84 | 2798.89 |
| [koa-next-as-function/async-await.js](koa-next-as-function/async-await.js) | `await next(context)` | 9342.62 | 7526.55 | 6479.24 | 5607.01 | 4919.38 |
