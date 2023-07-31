function error(cause="some error occured"){
    return new Error(JSON.stringify({cause}))
}

export function badAuthError(){
    return error("bad authentication")
}

export function notFoundError(){
    return error("not found")
}