import { mutableHandlers, readonlyHandlers } from "./baseHandle"
export const enum reactiveFlag {
    isReactive = "_v_isReactive",
    isReadonly = "_v_isReadonly"
}
export function reactive(raw) {
    return new Proxy(raw, mutableHandlers)
}

export function readonly(raw) {
    return new Proxy(raw, readonlyHandlers)
}    


export function isReactive(value) {
    return !!value["_v_isReactive"]
}
export function isReadonly(value) {
    return !!value["_v_isReadonly"]
}

export const isObject = (val) => {
    return val !==null && typeof val === "object"
}

// isproxy `

export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}

