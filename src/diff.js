import {
    PROPS,
    REPLACE,
    REORDER,
    TEXT
} from './patch'

const patches = {}

export default function diff(oldv, newv) {
    patches = {}
    walk(oldv, newv, 0, patches)
}

function walk(oldv, newv, index) {
    const currentPatches = []
    if (_.isString(oldv) && _.isString(newv)) {
        if (oldv !== newv) {
            currentPatches.push({
                type: TEXT,
                text: newv
            })
        }
    } else if (oldv.tagName === newv.tagName &&
        oldv.key === newv.key) {
        const propsPatch = diffProps(oldv, newv)
        if(propsPatch) {
            currentPatches.push({
                type: PROPS,
                props: propsPatch
            })
        }

        diffChildren(oldv.children, newv.children, index, currentPatches)
    } else {
        currentPatches.push({
            type: REPLACE,
            vnode: newv
        })
    }

    if(currentPatches.length) {
        patches[index] = currentPatches
    }
}

function diffProps(oldv, newv) {
    const diffprops = {}
    let count = 0
    for(let key in oldv) {
        const value = oldv[key], newValue = newv[key]
        if(newValue !== value) {
            diffprops[key] = newValue
            count++
        }
    }

    for(let key in newv) {
        if(!oldv[key]) {
            diffprops[key] = newv[key]
            count++
        }
    }

    return count === 0 ? null : diffprops
}

function diffChildren(oldChildren, newChildren, index, currentPatches) {
    const diffs = diffList(oldChildren, newChildren, 'key')
    if(diffs.moves.length) {
        currentPatches.push({
            type: REORDER,
            moves: diffs.moves
        })
    }
}