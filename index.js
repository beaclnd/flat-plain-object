const flatPlainObj = function(originObj, argOptions) {
    const options = argOptions || {} 
    const keypathDelimiter = options.delimiter || '.'
    const flatArrayFlag = options.flatArrayFlag || false

    if(typeof originObj !== 'object')
        throw new Error("Bad parameter, the originObj must be a plain object")
    if(typeof keypathDelimiter !== 'string')
        throw new Error("Bad parameter, the delimiter must be a string")
    if(typeof flatArrayFlag !== 'boolean')
        throw new Error("Bad parameter, the flatArrayFlag must be a boolean value")

    var r = {}
    const path = ''
    if(JSON.stringify(originObj) !== '{}')
        flatting(originObj, path, r, keypathDelimiter, flatArrayFlag)
    return r
}

const flatting = function(obj, path, r, delimiter, flatArrayFlag) {
    if(typeof obj !== 'object' || (typeof obj === 'object' && JSON.stringify(obj) === '{}')
        || (!flatArrayFlag && (obj instanceof Array))){
        path = path.slice(1)
        r[path] = obj
    }
    else{
        const keys = Object.keys(obj)
        for(var i = 0, len = keys.length; i < len; i++){
            flatting(obj[keys[i]], path+delimiter+keys[i], r, delimiter, flatArrayFlag)
        }
    } 
}

module.exports = flatPlainObj