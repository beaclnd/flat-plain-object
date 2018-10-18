const flatPlainObj = (originObj, keypathDelimiter = '.') => {
    if(typeof originObj !== 'object')
        throw new Error("Bad parameter, the type of originObj should be a plain object")
    let r = {}
    const path = ''
    if(JSON.stringify(originObj) !== '{}')
        flatting(originObj, path, r, keypathDelimiter)
    return r
}

const flatting = (obj, path, r, delimiter) => {
    if(typeof obj !== 'object' || (typeof obj === 'object' && JSON.stringify(obj) === '{}')){
        path = path.slice(1)
        r[path] = obj
    }
    else{
        const keys = Object.keys(obj)
        for(let i of keys){
            flatting(obj[i], path+delimiter+i, r, delimiter)
        }
    } 
}

export default flatPlainObj