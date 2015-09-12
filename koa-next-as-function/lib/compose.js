'use strict';

function compose(middleware) {
    let CACHE = Symbol()
    let noop = function () {
        return Promise.resolve(undefined)
    }
    return function (ctx, next) {
        next = next || noop
        if (!next[CACHE]) {
            next[CACHE] = middleware.reduceRight(function (next, fn) {
                return function (ctx) {
                    try {
                        let result = fn(ctx, next)
                        if (result && typeof result.then === 'function') {
                            return result
                        }
                        return Promise.resolve(result)
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
            }, next)
        }
        return next[CACHE](ctx)
    }
}

module.exports = compose

// let fn = compose([
//     (ctx, next) => {
//         return next(ctx)
//     },
//     async (ctx, next) => {
//         return next(ctx)
//     },
//     async (ctx, next) => {
//         await next(ctx)
//     },
// ])
//
