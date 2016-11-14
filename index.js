import {h, update} from './src'

function Demo(props) {

    const { extra, items, sort, onchange, value} = props

    const extraBlock = extra ? (<div>Extra Div</div>) : null

    return (<div>
        <button onclick={sort}>Sort</button>
        <ul>
            {items.map((item) => {
                return (<li> {item} </li>)
            })}
        </ul>
        <input type="text" onkeyup={onkeyup} value={value}/>
        {extraBlock}
        <span>Extra Span</span>
    </div>)
}


function onkeyup(e) {
    //props.value = e.target.value
    props.extra = !props.extra
    let newnode = Demo(props)
    update(el, vnode, newnode)
    vnode = newnode
}

function sort() {
    props.items = createItems(5, 10)
    let newnode = Demo(props)
    update(el, vnode, newnode)
    vnode = newnode
}

function createItems(min, max) {
    const length = Math.floor(Math.random() * (max - min)) + min
    const arr = []
    for(let i = length; i; i--) {
        arr.push(Math.floor(Math.random() * 100))
    }
    console.log(arr)
    return arr
}

const props = {
    value: '',
    extra: false,
    items: [5, 3, 2, 4, 1],
    sort, onkeyup
}
let vnode = Demo(props)

let el = vnode.render()
document.body.appendChild(el)
