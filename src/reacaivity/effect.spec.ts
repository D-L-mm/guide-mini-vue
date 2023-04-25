import { effect , stop} from "../effect";
import { reactive } from "../reactive"


it('effect 🐺🐺🐺🐺🐺🐺', () => {
    const user = reactive({
        age: 10
    })

    let nextAge;

    effect(() => {
        nextAge = user.age + 1
    })

    expect(nextAge).toBe(11)
    user.age++;
    expect(nextAge).toBe(11)
})

// 测试 effect 返回的 runner
// effect(fn) - function(runner) - fn - return
it('测试Effect 的 runner 🐍🐍🐍🐍🐍🐍', () => {
    let foo = 10

    const runner = effect(() => {
        foo++
        return "嘟嘟憨憨🐱"
    })
    expect(foo).toBe(11)

    const test = runner()
    expect(test).toBe("嘟嘟憨憨🐱")
    
})

// scheduler 测试
// effect 得第二个参数定义得scheduler 的fn
// effect 第一次执行的时候，还会执行fn
// 当响应式对象 set update的时候，不会执行fn， 而是执行scheduler
// 当执行runner的时候，会再次执行fn
it("测试scheduler 🦒🦒🦒🦒🦒🦒", () => {
    let run: any, dummy
    const scheduler = jest.fn(() => {
        run = runner;
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
        () => {
            dummy = obj.foo
        },
        { scheduler }
    )
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    // should be called on first trigger
    obj.foo++
    // expect(scheduler).toHaveBeenCalledTimes(1)
    // should not run yet
    expect(dummy).toBe(1)
    // manually run
    runner()
    // should have run
    expect(dummy).toBe(2)
})
