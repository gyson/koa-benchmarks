'use strict';

const os = require('os')
const path = require('path')
const glob = require('glob')
const child = require('child_process')

let cpus = os.cpus()

console.log(`
## info

    Time:       ${new Date()}
    Machine:    ${os.platform()}, ${os.arch()}, ${cpus[0].model} x ${cpus.length}
    Nodejs:     ${process.versions.node}
    V8:         ${process.versions.v8}

## note

* all tests use \`Bluebird\` as Promise polyfill
* all tests with async-await function will be transfered to \`Bluebird.coroutine\` by babeljs`)

const PORT = 3333

function run(filename, mw) {
    // bench script from koajs/koa
    let cmd = `node -e ' \
        require("babel/register")({ stage: 1, optional: ["bluebirdCoroutines"] }); \
        global.Promise = require("bluebird"); \
        require("${filename}"); \
    '`

    return child.execSync(`
        MW=${mw} PORT=${PORT} ${cmd} &
        pid=$!

        sleep 2

        wrk 'http://localhost:${PORT}/hello' -d 5 -c 50 -t 8 | grep 'Requests/sec'

        kill $pid
    `, {
        cwd: __dirname,
        //      stdin     stdout  stderr
        stdio: ['ignore', 'pipe', 'pipe']
    })
}

function bench(name, api, filename) {
    process.stdout.write(`| [${name}](${name}) | \`${api}\``)

    for (let i of [1, 25, 50, 75, 100]) {
        let output = run(filename, i).toString()

        process.stdout.write(' | ' + /\d+(?:.\d+)?/.exec(output)[0])
    }
    process.stdout.write(' |\n')
}

console.log(`
## bench middleware

use \`wrk\` to test the Requests/sec (higher is better) for 1, 25, 50, 75, 100 noop middleware.

| filename | API | 1 | 25 | 50 | 75 | 100 |
|:---------|----:|--:|---:|---:|---:|----:|`)

bench('koa-next-as-wrapper/async-await.js', 'await next', path.join(__dirname, 'koa-next-as-wrapper/async-await.js'))
bench('koa-next-as-function/async-await.js', 'await next(context)', path.join(__dirname, 'koa-next-as-function/async-await.js'))
bench('koa-next-as-wrapper/generator-yield.js', 'return yield next', path.join(__dirname, 'koa-next-as-wrapper/generator-yield.js'))
bench('koa-next-as-wrapper/generator-delegate.js', 'return yield* next', path.join(__dirname, 'koa-next-as-wrapper/generator-delegate.js'))
bench('koa-next-as-function/function-return.js', 'return next(context)', path.join(__dirname, 'koa-next-as-function/function-return.js'))
