import FlatPlainObj from '../index'
//const FlatPlainObj = require('../index')

test("flat a non-empty one level plain object, the result should be the same object", () => {
    const objOrigin = {a: 12, b: 34, c: "lkjh"}
    const objFlatted = FlatPlainObj(objOrigin, {delimiter: '.'})
    expect(objOrigin).toEqual(objFlatted)
})

test("flat a empty plain object, the result should be a empty object", () => {
    const objOrigin = {}
    const objFlatted = FlatPlainObj(objOrigin, {delimiter: '-'})
    expect(objFlatted).toEqual({})
})

test("flat a multi level plain object, the result should be a one level object", () => {
    const objOrigin = {a: 12, b: {b1: "lkhj", b2: {b21: 12, b22: {}}}, c: {c1: 34, c2: "klhj", c3: {c31: 56, c32: {c321: "lgfd"}}}}
    const objFlatted = FlatPlainObj(objOrigin)
    expect(objFlatted['a']).toBe(12)
    expect(objFlatted['b']).toEqual(undefined)
    expect(objFlatted['b.b1']).toBe('lkhj')
    expect(objFlatted['b.b2.b21']).toBe(12)
    expect(objFlatted['b.b2.b22']).toEqual({})
    expect(objFlatted['c']).toEqual(undefined)
    expect(objFlatted['c.c1']).toBe(34)
    expect(objFlatted['c.c2']).toBe('klhj')
    expect(objFlatted['c.c3.c31']).toBe(56)
    expect(objFlatted['c.c3.c32.c321']).toBe('lgfd')
})

test("flat a plain object containing function field, the function field shouldn't be flatted", () => {
    const f = () => {let b = 34; let c = 'jk'; return c+b}
    const objOrigin = {a: 12, fun: f}
    const objFlatted = FlatPlainObj(objOrigin)
    expect(objFlatted['fun']).toEqual(f)
})

test("flat a plain object containing array field, the array field shouldn't be flatted when it doesn't assign the flatArrayFlag to be true"
    , () => {
        const objOrigin = {a: [1, 2, 3, 4], c: {c1: ['x', 'y', 'z']}}
        const objFlatted = FlatPlainObj(objOrigin)
        expect(objFlatted['a']).toEqual([1, 2, 3, 4])
        expect(objFlatted['c.c1']).toEqual(['x', 'y', 'z'])
    }
)

test("flat a plain object containing array field, the array field should be flatted when it assign the flatArrayFlag to be true"
    , () => {
        const objOrigin = {a: [1, 2, 3, 4], c: {c1: ['x', 'y', 'z']}}
        const objFlatted = FlatPlainObj(objOrigin, {flatArrayFlag: true})
        expect(objFlatted['a.0']).toBe(1)
        expect(objFlatted['a.1']).toBe(2)
        expect(objFlatted['a.2']).toBe(3)
        expect(objFlatted['a.3']).toBe(4)
        expect(objFlatted['c.c1.0']).toBe('x')
        expect(objFlatted['c.c1.1']).toBe('y')
        expect(objFlatted['c.c1.2']).toBe('z')
    }
)

test("when flat a non-plain object, it should throw an error", () => {
    const objOrigin = () => 1
    expect(() => FlatPlainObj(objOrigin)).toThrowError("Bad parameter, the originObj must be a plain object")
})

test("when meet a non-string type delimiter, it should throw an error", () => {
    expect(() => FlatPlainObj({}, {delimiter :1})).toThrowError("Bad parameter, the delimiter must be a string")
    expect(() => FlatPlainObj({}, {delimiter: {}})).toThrowError("Bad parameter, the delimiter must be a string")
    expect(() => FlatPlainObj({}, {delimiter: () => 1})).toThrowError("Bad parameter, the delimiter must be a string")
})

test("When meet a non-boolean type flatArrayFlag, it should throw an error", () => {
    expect(() => FlatPlainObj({}, {flatArrayFlag: 1})).toThrowError("Bad parameter, the flatArrayFlag must be a boolean value")
    expect(() => FlatPlainObj({}, {flatArrayFlag: "abc"})).toThrowError("Bad parameter, the flatArrayFlag must be a boolean value")
    expect(() => FlatPlainObj({}, {flatArrayFlag: () => 1})).toThrowError("Bad parameter, the flatArrayFlag must be a boolean value")
})