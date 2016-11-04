/*!
 * clean-stacktrace <https://github.com/tunnckoCore/clean-stacktrace>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var clean = require('./index')

test('default', function (done) {
  var pre = 'Error: foo\n    at Test.fn (/Users/sindresorhus/dev/clean-stack/test.js:6:15)'
  var stack = [
    pre,
    '    at handleMessage (internal/child_process.js:695:10)',
    '    at Pipe.channel.onread (internal/child_process.js:440:11)',
    '    at process.emit (events.js:172:7)'
  ].join('\n')
  test.strictEqual(clean(stack), pre)
  done()
})

test('default #2', function (done) {
  var pre = 'Error: foo\n    at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:4:7)'
  var stack = [
    pre,
    '    at Module._compile (module.js:409:26)',
    '    at Object.Module._extensions..js (module.js:416:10)',
    '    at Module.load (module.js:343:32)',
    '    at Function.Module._load (module.js:300:12)',
    '    at Function.Module.runMain (module.js:441:10)',
    '    at startup (node.js:139:18)'
  ].join('\n')
  test.strictEqual(clean(stack), pre)
})

test('directly executed node script', function (done) {
  var pre = 'Error: foo\n    at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:4:7)'
  var stack = [
    pre,
    '    at Module._compile (module.js:409:26)',
    '    at Object.Module._extensions..js (module.js:416:10)',
    '    at Module.load (module.js:343:32)',
    '    at Function.Module._load (module.js:300:12)',
    '    at Function.Module.runMain (module.js:441:10)',
    '    at startup (node.js:139:18)',
    '    at node.js:968:3'
  ].join('\n')
  test.strictEqual(clean(stack), pre)
  done()
})

test('internal child_process', function (done) {
  var pre = 'Error: foo\n    at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:4:7)'
  var stack = [
    pre,
    '    at Module._compile (module.js:409:26)',
    '    at Object.Module._extensions..js (module.js:416:10)',
    '    at internal/child_process.js:696:12'
  ].join('\n')
  test.strictEqual(clean(stack), pre)
  done()
})

test('babel-polyfill', function (done) {
  var pre = 'Error: foo\n    at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:4:7)'
  var stack = [
    pre,
    '    at run (/Users/sindresorhus/dev/clean-stack/node_modules/babel-polyfill/node_modules/core-js/modules/es6.promise.js:87:22)',
    '    at /Users/sindresorhus/dev/clean-stack/node_modules/babel-polyfill/node_modules/core-js/modules/es6.promise.js:100:28'
  ].join('\n')
  test.strictEqual(clean(stack), pre)
  done()
})

test('work on Windows', function (done) {
  var expected = 'Error: foo\n    at Test.fn (/Users/sindresorhus/dev/clean-stack/test.js:6:15)'
  var stack = [
    'Error: foo',
    '    at Test.fn (\\Users\\sindresorhus\\dev\\clean-stack\\test.js:6:15)',
    '    at handleMessage (internal\\child_process.js:695:10)',
    '    at Pipe.channel.onread (internal\\child_process.js:440:11)',
    '    at process.emit (events.js:172:7)'
  ].join('\n')
  test.strictEqual(clean(stack), expected)
  done()
})
