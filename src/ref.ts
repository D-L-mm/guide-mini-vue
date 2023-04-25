import { isTracking, TrackEffects, TriggerEffects } from "./effect"

class RefImpl {
    private _value: any
    dep 
    _v_isRef = true

    constructor(value) {
        this._value = value
        this.dep = new Set()
    }
    get value() {
        if(isTracking()) {
            TrackEffects(this.dep)
        }
        return this._value
    }

    set value(newValue) {

        // object 判断两个值是不是相等
        if(Object.is(newValue, this._value)) return

        this._value = newValue
        TriggerEffects(this.dep)
       
    }
}

export function ref(value) {
    return new RefImpl(value)
}


export function isRef(value) {
    return !!value._v_isRef
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}