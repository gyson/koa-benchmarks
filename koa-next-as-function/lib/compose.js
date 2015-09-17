'use strict';

module.exports = compose

function compose(middleware) {
    return function (next) {
        let ctx = this
        return (function createNext(i) {
            if (i >= middleware.length) {
                return next || noop
            } else {
                return function () {
                    try {
                        let result = middleware[i].call(ctx, createNext(i + 1))
                        if (result && typeof result.then === 'function') {
                            return result
                        } else {
                            return Promise.resolve(result)
                        }
                    } catch (e) {
                        return Promise.reject(e)
                    }
                }
            }
        })(0)()
    }
}

function noop() {
    return Promise.resolve(undefined)
}

// let fn = compose([
//     function (next) {
//         console.log(1, this)
//         return next().then(() => console.log(6))
//     },
//     function (next) {
//         console.log(2, this)
//         return next().then(() => console.log(5))
//     },
//     function (next) {
//         console.log(3, this)
//         return next().then(() => console.log(4))
//     },
// ])
//
// fn.call(123).then(() => console.log('done'))
