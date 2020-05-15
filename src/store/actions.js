export const types = {
    ADD_TOKEN: 'ADD_TOKEN',
    ADD_USER: 'ADD_USER',
    CLEAR_AUTH: 'CLEAR_AUTH',
}

export const addToken = token => ({type: types.ADD_TOKEN, payload: token})
export const addUser = user => ({type: types.ADD_USER, payload: user})
export const clearAuth = () => ({type: types.CLEAR_AUTH}) 