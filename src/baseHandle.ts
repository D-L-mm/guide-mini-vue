import { track, trigger } from "./effect"
import { isObject, reactive, reactiveFlag, readonly } from "./reactive"
const get =  createGetter()
const set = createSetter()

const readonlyGet = createGetter(true)
// get抽离出来
function createGetter(isReadonly=false) {
    return function get(target, key) {
        const res = Reflect.get(target, key)

        // 判断是不是reactive/readonly
        if(key===reactiveFlag.isReactive) {
            return !isReadonly
        }else if (key === reactiveFlag.isReadonly) {
            return isReadonly
        }

        // 看看res是不是object
       if(isObject(res)) {
        return isReadonly ? readonly(res) : reactive(res)
       }

        if(isReadonly) { 
            track(target, key)
        }
        return res
    }
}

function createSetter () {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value) 
        //TODO 触发依赖
        trigger(target, key)
    
        return res
    }
}

export const mutableHandlers = {
    get,
    set
}

export const readonlyHandlers = {
    get:readonlyGet,
    set(target, key, value) {
        return true
    }
}
