export const types = {
    ADD_TOKEN: 'ADD_TOKEN',
    ADD_USER: 'ADD_USER',
    CLEAR_AUTH: 'CLEAR_AUTH',
    SET_LENGTH_POSTS: 'SET_LENGTH_POSTS',
    ADD_POSTS: 'ADD_POSTS',
    SET_LIKED_POST: 'SET_LIKED_POST',
    START_LOAD_POSTS: 'START_LOAD_POSTS',
    END_LOAD_POSTS: 'END_LOAD_POSTS',
    CLEAR_POSTS: 'CLEAR_POSTS',
    RESET: 'RESET'
}

export const addToken = token => ({type: types.ADD_TOKEN, payload: token})
export const addUser = user => ({type: types.ADD_USER, payload: user})
export const clearAuth = () => ({type: types.CLEAR_AUTH}) 
export const setLength = length => ({type: types.SET_LENGTH_POSTS, payload: length})
export const startLoadPost = () => ({type: types.START_LOAD_POSTS})
export const endLoadPost = () => ({type: types.END_LOAD_POSTS})
export const addPosts = (posts, isLocal = false) => ({type: types.ADD_POSTS, payload: {posts, isLocal}})
export const setLikedPost = (_id, likedPost, index) => ({type: types.SET_LIKED_POST, payload: {_id, index, likedPost}}) 
export const clearPosts = () => ({type: types.CLEAR_POSTS})
export const reset = () => ({type: types.RESET})