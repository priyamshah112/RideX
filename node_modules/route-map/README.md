## route-map

Match a url from an object of route patterns.

Republished from @azer.

## Install

```bash
$ npm install route-map
```

## Usage

```js
routeMap = require('route-map')

match = routeMap({
  '/people/:name': showUser,
  '/pages/:page': showPage
})

match('http://foobar.com/people/john?foo=bar')
// => {
//       fn: showUser,
//       params: { name: 'john' },
//       qs: { foo: 'bar' }, // querystring
//       pattern: 'people/:name',
//       url: 'people/john?foo=bar'
//    }

match('nonexisting')
// => undefined
```
