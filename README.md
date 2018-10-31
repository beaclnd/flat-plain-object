# Flat-Plain-Object
A very simple utility for the purpose of flatting a plain object which is constituted by nested object(s).

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
const FlatPlainObj = require('flat-plain-object')
*/
let objFlatted = FlatPlainObj(objOrigin, '.')
```

### FlatPlainObj(objOrigin, options)
- **objOrigin**, your origin plain object needs to be flatted
- **options**, a parameter object accepting 2 properties: **delimiter** and **flatArrayFlag**
  + **delimiter**, the delimiter for a flatted key path, the default is **\'.\'**
  + **flatArrayFlag**, the bool variable to control whether to flat array, the default value is **false**

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

let objFlatted = FlatPlainObj(objOrigin)
/*
objFlatted represented as
{
    a: 12,
    b: 'hello world!',
    'c.c1': 34,
    'c.c2': '!dlrow olleh',
    'd.d1.d11.d111': 56,
    'd.d1.d12': 'he'
}
*/

objOrigin = {
    a: 12,
    b: 'hello world!',
    c: [1, 2, 3],
}
objFlatted = FlatPlainObj(objOrigin)
/*
objFlatted represented as
{
    a: 12,
    b, 'hello world!',
    c: [1, 2, 3],
}
*/

objFlatted = FlatPlainObj(objOrigin, {flatArrayFlag: true})
/*
objFlatted represented as
{
    a: 12,
    b, 'hello world!',
    'c.0': 1,
    'c.1': 2,
    'c.2': 3,
}
*/
```