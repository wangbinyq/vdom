import _ from './utils.js'

class VNode {
    constructor(tagName, props, ...children) {
        this.tagName = tagName || 'div'
        this.props = props || {}
        this.children = _.flatten(children)

        this.dealChildren()
    }

    render() {
        const el = document.createElement(this.tagName)
        
        for(let prop in this.props) {
            _.setProp(el, prop, this.props[prop])
        }

        for(let child of this.children) {
            if(_.isDefined(child)) {
                let childEl

                if(child.render) {
                    childEl = child.render()
                } else{
                    childEl = document.createTextNode(child)
                }

                el.appendChild(childEl)
            }
        }

        return el
    }

    dealChildren() {
        let count = 0
        this.children.forEach((child) => {
            if(child instanceof Element) {
                count += child.count
            } else {
                child = '' + child
            }
            count++
        })
        this.count = count
    }
}

export default function h(...args) {
    return new VNode(...args)
}