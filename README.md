# [clean-stacktrace][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Clean up error stack traces - just a fork. Working on node.js v0.10 and above.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Just a fork of [clean-stack][]

Just switched some bytes to make it work in node.js v0.10. That's why i hate that rush. In some cases it make sense to be ES2015/2016 and etc; and in some not make sense.

Even more for packages like this one.

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i clean-stacktrace --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const cleanStacktrace = require('clean-stacktrace')
```

## API

### [cleanStacktrace](index.js#L45)
> Removes mostly not needed internal Nodejs entries.

**Params**

* `stack` **{String}**: an error stack trace    
* `returns` **{String}**: modified and cleaned stack  

**Example**

```js
var cleanStack = require('clean-stacktrace')
var error = new Error('Missing unicorn')

console.log(error.stack)
// =>
// Error: Missing unicorn
//     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
//     at Module._compile (module.js:409:26)
//     at Object.Module._extensions..js (module.js:416:10)
//     at Module.load (module.js:343:32)
//     at Function.Module._load (module.js:300:12)
//     at Function.Module.runMain (module.js:441:10)
//     at startup (node.js:139:18)

console.log(cleanStack(error.stack))
// =>
// Error: Missing unicorn
//     at Object.<anonymous> (/Users/sindresorhus/dev/clean-stack/unicorn.js:2:15)
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/clean-stacktrace/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[npmjs-url]: https://www.npmjs.com/package/clean-stacktrace
[npmjs-img]: https://img.shields.io/npm/v/clean-stacktrace.svg?label=clean-stacktrace

[license-url]: https://github.com/tunnckoCore/clean-stacktrace/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/clean-stacktrace.svg

[downloads-url]: https://www.npmjs.com/package/clean-stacktrace
[downloads-img]: https://img.shields.io/npm/dm/clean-stacktrace.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/clean-stacktrace
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/clean-stacktrace.svg

[travis-url]: https://travis-ci.org/tunnckoCore/clean-stacktrace
[travis-img]: https://img.shields.io/travis/tunnckoCore/clean-stacktrace/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/clean-stacktrace
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/clean-stacktrace.svg

[david-url]: https://david-dm.org/tunnckoCore/clean-stacktrace
[david-img]: https://img.shields.io/david/tunnckoCore/clean-stacktrace.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

[clean-stack]: https://github.com/sindresorhus/clean-stack