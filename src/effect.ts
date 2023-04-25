class ReactiveEffect {
    private _fn: any
    deps = []
    active = true
    constructor(fn, public scheduler?) {

        this._fn = fn
    }
    run() {

        if(this.active) {
            return this._fn()
        }

        shouldTrack = true
        activeEffect = this

        const result = this._fn()
        shouldTrack = false
        return result
    }

    stop() {
        if (this.active) {
            clearEffectFunction(this)
            this.active = false
        }
    }
}

function clearEffectFunction(effect) {
    effect.deps.forEach((deps: any) => {
        deps.delete(effect)
    })
}

// 收集依赖 
let targetMap = new Map()
export function track(target, key) {

    if(!isTracking) return

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    TrackEffects(dep)
}

// 收集依赖方法拆离出来
export function    TrackEffects (dep) {
    
    if(dep.has(activeEffect)) return
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}

export function isTracking() {
    return activeEffect && shouldTrack !== undefined

    // if(!activeEffect) return
    // if(!shouldTrack) return
}
// 触发依赖
export function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        // never been tracked
        return
    }
    let dep = depsMap.get(key)

    TriggerEffects(dep)
}
// 触发依赖的抽离成公共方法
export function TriggerEffects(dep) {
    
    for (const effect of dep) {

        // 判断有么有scheduler
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}
let activeEffect
let shouldTrack

export function effect(fn,   options:any={}) {

    const _effect = new ReactiveEffect(fn, options )
    _effect.run()

    // 解决指针问题

    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect  
    return runner
}

// stop stop执行后，scheduler不会在执行
export function stop(runner) {
    runner.effect.stop()
}
