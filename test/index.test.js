import FlatPlainObj from '../index'
//const FlatPlainObj = require('../index')

test("flat a non-empty one level plain object, the result should be the same object", () => {
    const objOrigin = {a: 12, b: 34, c: "lkjh"}
    const objFlatten = FlatPlainObj(objOrigin, '.')
    expect(objOrigin).toEqual(objFlatten)
})

test("flat a empty plain object, the result should be a empty object", () => {
    const objOrigin = {}
    const objFlatten = FlatPlainObj(objOrigin, '-')
    expect(objFlatten).toEqual({})
})

test("flat a multi level plain object, the result should be a one level object", () => {
    const objOrigin = {a: 12, b: {b1: "lkhj", b2: {b21: 12, b22: {}}}, c: {c1: 34, c2: "klhj", c3: {c31: 56, c32: {c321: "lgfd"}}}}
    const objFlatten = FlatPlainObj(objOrigin)
    expect(objFlatten['a']).toBe(12)
    expect(objFlatten['b']).toEqual(undefined)
    expect(objFlatten['b.b1']).toBe('lkhj')
    expect(objFlatten['b.b2.b21']).toBe(12)
    expect(objFlatten['b.b2.b22']).toEqual({})
    expect(objFlatten['c']).toEqual(undefined)
    expect(objFlatten['c.c1']).toBe(34)
    expect(objFlatten['c.c2']).toBe('klhj')
    expect(objFlatten['c.c3.c31']).toBe(56)
    expect(objFlatten['c.c3.c32.c321']).toBe('lgfd')
})

test("flat a plain object containing function, the function value shouldn't be flatten", () => {
    const f = () => {let b = 34; let c = 'jk'; return c+b}
    const objOrigin = {a: 12, fun: f}
    const objFlatten = FlatPlainObj(objOrigin)
    expect(objFlatten['fun']).toEqual(f)
})

test("when flat a non-plain object, it should throw an error", () => {
    const objOrigin = () => 1
    expect(() => FlatPlainObj(objOrigin)).toThrowError("Bad parameter, the type of originObj must be a plain object")
})

test("when meet a non-string delimiter, it should throw an error", () => {
    expect(() => FlatPlainObj({}, 1)).toThrowError("Bad parameter, the type of keypathDelimiter must be a string")
    expect(() => FlatPlainObj({}, {})).toThrowError("Bad parameter, the type of keypathDelimiter must be a string")
    expect(() => FlatPlainObj({}, () => 1)).toThrowError("Bad parameter, the type of keypathDelimiter must be a string")
})