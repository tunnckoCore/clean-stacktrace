/*!
 * clean-stacktrace <https://github.com/tunnckoCore/clean-stacktrace>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

var regex = /(?:(?:(?:node|(?:internal\/|.*node_modules\/babel-polyfill\/.*)\w+)\.js:\d+:\d+)|native)/
var nodeInternals = require('stack-utils-node-internals')

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
