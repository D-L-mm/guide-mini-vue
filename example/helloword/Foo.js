import { h } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {

    render() {
        return h("div", {
            
        }, 
        "foo:" +this.count
        
        )
    },
    setup(props) {
        console.log('props', props)
        return {
          

            // props 不能被修改.redonly对象
        }
    }
}