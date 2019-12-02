
export function encode(str:string):string{
    return Buffer.from(str).toString('base64')
}

export function decode(base64str:string, code:string = 'utf-8'):string{
    return Buffer.from(base64str, 'base64').toString(code)
}
