/*!
 * clean-stacktrace <https://github.com/tunnckoCore/clean-stacktrace>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * Released under the MIT license.
 */

'use strict'

var extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/
var pathRegex = /^(?:(?:(?:node|(?:internal\/|.*node_modules\/babel-polyfill\/.*)?\w+)\.js:\d+:\d+)|native)/

/**
 * > Removes mostly not needed internal Nodejs entries.
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
 * ```
 *
 * @param  {String} `stack` an error stack trace
 * @return {String} modified and cleaned stack
 * @api public
 */

module.exports = function cleanStacktrace (stack) {
  return stack.replace(/\\/g, '/')
    .split('\n')
    .filter(function (x) {
      var pathMatches = x.match(extractPathRegex)

      if (pathMatches === null || !pathMatches[1]) {
        return true
      }

      return !pathRegex.test(pathMatches[1])
    })
    .filter(function (x) {
      return x.trim() !== ''
    })
    .join('\n')
}
