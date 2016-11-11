import _ from './utils.js'

function setProp(el, prop, value) {
    if(prop === 'value') {
        el.value = value
    } else if (prop.indexOf('on') === 0) {
        const event = prop.slice(2).toLowerCase()
        el.addEventListener(event, value)
    } else {
        if(value !== undefined) {
            el.setAttribute(prop, value)
        } else {
            el.removeAttribute(prop)
        }
    }
}

export default class VNode {
    constructor(tagName, props, ...children) {
        this.tagName = tagName || 'div'
        this.props = props || {}
        this.key = props.key || void 0
        this.children = _.flatten(children)

        this.dealChildren()
    }

    render() {
        const el = document.createElement(this.tagName)
        
        for(let prop in this.props) {
            setProp(el, prop, this.props[prop])
        }

        for(let child in this.children) {
            let childEl
            if(child.render) {
                childEl = child.render()
            } else {
                childEl = document.createTextNode(child)
            }
            el.appendChild(childEl)
        }

        return el
    }

    dealChildren() {
        let count = 0
        this.children.forEach((child) => {
            if(_.isType(child, Element)) {
                count += child.count
            } else {
                child = '' + child
            }
            count++
        })
        this.count = count
    }
}