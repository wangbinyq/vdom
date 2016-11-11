export default {
    flatten(array) {
        return [].concat.apply([], array)
    },
    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    isType(obj, type) {
        return obj.constrcutor === type
    },
    isString(obj) {
        return this.isType(obj, String)
    },
    isObject(o) {
        return typeof o === 'object'
    },
    deepEqual(o1, o2) {

        if(!(this.isObject(o1) && this.isObject(o2))) {
            return o1 === o2
        }

        for(let key in o1) {
            if(!this.deepEqual(o1[key], o2[key])) {
                return false
            }
        }
        for(let key in o2) {
            if(!this.deepEqual(o1[key], o2[key])) {
                return false
            }
        }
        
        return true
    }
}