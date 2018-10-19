# Flat-Plain-Object
A very simple utility for the purpose of flatting a plain object which is constituted by nested objects.

## Install
In node environment, install it with npm:
```Bash
npm install -s flat-plain-object
```
or with yarn:
```Bash
yarn add flat-plain-object
```
## Usage
Import it as a function accepting two parameters.
```javascript
// es6 style
import FlatPlainObj from 'flat-plain-object'
/* or CommonJS style
const FlatPlainObj = require('flat-plain-object').default
*/
let objFlatten = FlatPlainObj(objOrigin, '.')
```
The 1st parameter is your nested plain object variable,
and the 2nd one is a delimiter(the default is '.') for keypath.

## Sample
```javascript
import FlatPlainObj from 'flat-plain-obj'
let objOrigin = {
    a: 12,
    b: 'hello world!',
    c: {
        c1: 34,
        c2: '!dlrow olleh'
    },
    d: {d1: {d11: {d111: 56}, d12: 'he'}}
}

let objFlatten = FlatPlainObj(objOrigin)
/*
objFlatten represented as
{
    a: 12,
    b: 'hello world!',
    'c.c1': 34,
    'c.c2': '!dlrow olleh',
    'd.d1.d11.d111': 56,
    'd.d1.d12': 'he'
}
*/
```