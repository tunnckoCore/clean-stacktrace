/*!
 * clean-stacktrace <https://github.com/tunnckoCore/clean-stacktrace>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var regex = /(?:(?:(?:node|(?:internal\/|.*node_modules\/babel-polyfill\/.*)\w+)\.js:\d+:\d+)|native)/
var nodeInternals = require('stack-utils-node-internals')

/**
 * > Removes mostly not needed internal Nodejs entries.
 * If you pass `mapper` function, you can make more
 * changes to each line of the stack - for example making
 * the paths to be relative, not absolute.
 *
 * **Example**
 *
 * ```js
 * var cleanStack = require('clean-stacktrace')
 * var error = new Error('Missing unicorn')
 *
 * console.log(error.stack)
 * // =>
 * // Error: Missing unicorn
 * //     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
 * //     at Module._compile (module.js:409:26)
 * //     at Object.Module._extensions..js (module.js:416:10)
 * //     at Module.load (module.js:343:32)
 * //     at Function.Module._load (module.js:300:12)
 * //     at Function.Module.runMain (module.js:441:10)
 * //     at startup (node.js:139:18)
 *
 * console.log(cleanStack(error.stack))
 * // =>
 * // Error: Missing unicorn
 * //     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
 *
 * // or making paths relative
 * var path = require('path')
 * var stack = clean(error.stack, (line) => {
 *   var m = /.*\((.*)\).?/.exec(line) || []
 *   return m[1] ? line.replace(m[1], path.relative(process.cwd(), m[1])) : line
 * })
 * // =>
 * // Error: Missing unicorn
 * //     at Object.<anonymous> (unicorn.js:2:15)
 * ```
 *
 * @param  {String} `stack` an error stack trace
 * @param  {Function} `mapper` more customization for each line
 * @return {String} modified and cleaned stack
 * @api public
 */

module.exports = function cleanStacktrace (stack, mapper) {
  if (!Array.isArray(stack)) {
    stack = stack.split('\n')
  }

  var result = []
  var internals = nodeInternals().concat(regex)

  if (!(/^\s*at /.test(stack[0])) && (/^\s*at /i.test(stack[1]))) {
    result.push(stack[0])
    stack = stack.slice(1)
  }

  stack.forEach(function (line) {
    var isInternal = internals.some(function (internal) {
      return internal.test(line)
    })

    if (isInternal) {
      return null
    }

    result.push(line)
  })

  result = typeof mapper === 'function' ? result.map(mapper) : result

  return result.join('\n')
}
