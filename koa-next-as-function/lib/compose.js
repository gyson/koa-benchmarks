'use strict';

const co = require('co')

function compose(middleware) {
    let CACHE = Symbol()
    let noop = function () {
        return Promise.resolve(undefined)
    }
    return function (next) {
        next = next || noop
        if (!next[CACHE]) {
            next[CACHE] = middleware.reduceRight(function (next, fn) {
                return function (ctx) {
                    try {
                        let result = fn.call(ctx, next)
                        if (result && typeof result.then === 'function') {
                            return result
                        }
                        if (result && typeof result.next === 'function'
                                   && typeof result.throw === 'function') {
                            return co.call(ctx, result)
                        }
                        return Promise.resolve(result)
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
            }, next)
        }
        return next[CACHE](this)
    }
}

module.exports = compose

// let fn = compose([
//     function (next) {
//         console.log(1, this)
//         return next(this)
//     },
//     function (next) {
//         console.log(2, this)
//         return next(this)
//     },
//     function* (next) {
//         console.log(3, this)
//         return next(this)
//     }
// ])
//
// fn.call({ hello: 'good' })
