export function isInteger() { 
    let regex = /^\d+$/
    return (param:string) => regex.test(param)
}

