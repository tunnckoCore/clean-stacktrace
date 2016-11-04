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
