import _ from './utils'

function createElement(node) {
    return node.render ? node.render() : document.createTextNode(node)
}

export default function updateElement(domNode, aNode, bNode) {
    if(!domNode) {
        console.warn('updateElement must have domNode')
        return
    }

    const parentNode = domNode.parentNode
    if(aNode && aNode.tagName && aNode.tagName === bNode.tagName) {
        const len = Math.max(aNode.children.length, bNode.children.length)
        let domIndex = 0
        for(let i = 0; i < len; i++) {
            const aChildNode = aNode.children[i]
            const bChildNode = bNode.children[i]

            if(_.isDefined(aChildNode)) {
                const domChildNode = domNode.childNodes[domIndex++]
                if(_.isDefined(bChildNode)) {
                    updateElement(domChildNode, aChildNode, bChildNode)
                } else {
                    domNode.removeChild(domChildNode)
                    domIndex--
                }
            } else {
                if(_.isDefined(bChildNode)) {
                    const beforeNode = domNode.childNodes[domIndex++] 
                    domNode.insertBefore(createElement(bChildNode), beforeNode || null)
                }
            }
        }
        updateProps(domNode, aNode, bNode)
    } else {
        if(aNode !== bNode) {
            parentNode.replaceChild(createElement(bNode), domNode)
        }
    }
}

function updateProps(domNode, aNode, bNode) {
    for(let prop in aNode.props) {
        if(!bNode.props.hasOwnProperty(prop)) {
            _.setProp(domNode, prop)
        }
    }

    for(let prop in bNode.props) {
        const aValue = aNode.props[prop]
        const bValue = bNode.props[prop]
        if(aValue !== bValue) {
            _.setProp(domNode, prop, bNode.props[prop])
        }
    }
}
