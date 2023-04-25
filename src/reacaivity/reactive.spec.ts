import { isProxy, isReactive, isReadonly, reactive } from "../reactive"
import { isRef, ref, unRef } from "../ref"

it('reactive 🐝🐝🐝🐝🐝🐝🐝', () => {
    const org = {foo: 1}
    const oll = reactive(org)

    expect(oll).not.toBe(org)
    expect(oll.foo).toBe(1)
    expect(isReactive(oll)).toBe(true)
    expect(isReactive(org)).toBe(false)

    // expect(isReadonly(oll)).toBe(false)
    // expect(isProxy(oll)).toBe(false)

})

it('nested reactive', () => {
    const ori = {
        nested: {
            foo: 1
        }
        ,
        arrar: [{bar: 2}]
    }
    const observed = reactive(ori)

    // expect(isReactive(observed.nested)).toBe(true)
    // expect(isReactive(observed.arrar)).toBe(true)


})

//  ref 测试
it('ref 测试 ', () => {

    const test = ref(1)
    // const reactiveTest = reactive(1)

    expect(test.value).toBe(1)
    // expect(isRef(reactiveTest)).toBe(true)
    // expect(unRef(reactiveTest)).toBe(1)

}) 

