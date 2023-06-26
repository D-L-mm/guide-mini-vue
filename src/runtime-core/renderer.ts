

import { isObject } from '../reactive'
import { createComponentInstance, setupComponent } from './components'
import { ShapeFlags } from '../shared/shapeFlags';
export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode: any, container: any) {
  // TODO 判断vnode是不是一个element
  // 是element 那么就处理element
  // 如何区分是element 还是 component

  //  Shape
  // vnode -> flag
  // element 
  const { shapeFlag } = vnode;

  if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container);

    // STATEFUL_COMPONENT
  } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
  }

}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(initialVNode: any, container: any) {

  var instance = createComponentInstance(initialVNode);
  setupComponent(instance);

  setupRenderEffect(instance, initialVNode, container)

}


function setupRenderEffect(instance: any, initialVNode, container: any) {

  // console.log('setupRenderEffect', instance.type.render())

  const { proxy } = instance
  const subTree = instance.render.call(proxy)
  patch(subTree, container)

  // element -> mount
  initialVNode.el = subTree.el
}

function processElement(vnode: any, container: any) {
  // init --update
  mountElement(vnode, container)
}



function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type));

  const { children, shapeFlag } = vnode;

  // children
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;

  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el);

  }


  // props
  const { props } = vnode;
  for (const key in props) {
    const val = props[key];
    // 具体的click  => 通用
    // on + Event name
    var isOn = function(key) {
      return /^on[A-Z]/.test(key)
    }
    if (isOn(key)) {
      // 获取事件名称
      var event_1 = key.slice(2).toLowerCase()
      el.addEventListener(event_1, val)

    } else {
      el.setAttribute(key, val);
    }
  }
  container.append(el);
}

function mountChildren(vnode: any, container: any) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}
//
