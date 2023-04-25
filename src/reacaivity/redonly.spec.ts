import { readonly } from "../reactive"

it('redonly 🐘🐘🐘🐘🐘🐘', () => {
     const ori = {
        foo:1,
        bar: {baz: 1}
     }

     const wrapped = readonly(ori)
     expect(wrapped).not.toBe(ori)
     expect(wrapped.foor).toBe(1)

})