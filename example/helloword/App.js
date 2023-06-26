import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js';
export const App = {
    render() {
        window.self = this;
        return h("div", {
            id: "root",
            class: ["red", "hard"],
            onClick() {
                console.log('click事件测试··')
            },
            onMousedown() {
                console.log('onmousedown事件测试~~')
            }
        },
            // [h("h2", {class: "red"}, "嘟嘟"), h("p", {},"是个憨憨")]
            // this.$el -> get root element\
            // Foo 组件
            [
                h("div", {}, "hi," + this.msg),
                h(Foo, {
                    count: 200
                })

            ]
        )
    },
    setup() {
        return {
            msg: "🐱🐱🐱🐱"
        }
    }
}