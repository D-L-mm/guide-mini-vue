import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentsPublicInstance";


export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {}
    };

    return component;
}

export function setupComponent(instance) {
    // TODO
    initProps(instance, instance.vnode.props)
    // initSlots()

    setupStatefunComponent(instance)
}

function setupStatefunComponent(instance: any) {

    const Component = instance.type

    // ctx
    instance.proxy = new Proxy(
        {_:instance}, 
            PublicInstanceProxyHandlers
        )

    const { setup } = Component

    if (setup) {
        const setupResult = setup(instance.peops)
        handleSetupResult(instance, setupResult)

    }

}
function handleSetupResult(instance: any, setupResult: any) {

    // function Object
    // TODO function
    if(typeof setupResult === "object") {
        instance.setupState = setupResult
    }

    finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {

    console.log('.render', instance)

   const    Component = instance.type
//    if(!Component.render) {
//     instance.render = Component.render
//    }
instance.render = Component.render

}

