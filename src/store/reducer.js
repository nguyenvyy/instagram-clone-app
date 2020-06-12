import { types } from "./actions"
import { initState } from "./DataProvider"
import { decode } from 'jsonwebtoken'

export const reducer = (state, action) => {
    switch (action.type) {
        case types.ADD_TOKEN: {
            const token = action.payload
            const user = decode(token)
            const auth = {...state.auth, token, user, 
                isAuthenticated: true, initLoading: false}
            return {...state, auth}
        }
        case types.ADD_USER: {
            const auth = {...state.auth, user: action.payload}
            return {...state, auth}
        }
        case types.CLEAR_AUTH: {
            return {...state, auth: initState.auth}
        }
        case types.START_LOAD_POSTS: {
            return {...state, posts: {
                ...state.posts,
                loading: true
            }}
        }
        case types.END_LOAD_POSTS: {
            return {...state, posts: {
                ...state.posts,
                loading: false
            }}
        }
        case types.SET_LENGTH_POSTS: {
            const length = action.payload
            return {...state, posts: {
                ...state.posts,
                pagination: {
                    ...state.posts.pagination,
                    length
                },
                initLoading: false
            }}
        }
        case types.ADD_POSTS: {
            const {posts, isLocal} = action.payload
            const {items, pagination, loading, initLoading} = state.posts
            let { skip, limit, length } = pagination
            let newItems 
            skip += posts.length 
            if(isLocal) {
                length += posts.length
                newItems =  posts.concat(items)
            } else {
                newItems = items.concat(posts)
            }
            return {...state, posts: {
                items: newItems,
                pagination: {
                    skip,
                    length,
                    limit
                },
                loading,
                initLoading
            }}
        }
        case types.SET_LIKED_POST: {
            let {index, _id} = action.payload
            if(typeof index !== 'number' || Number.isNaN(index)) {
                index = state.posts.items.findIndex(post => post._id === _id)
            }
            const postItems = state.posts.items.slice()
            const prePost = postItems[index]
            const likedPost = {...prePost, canLike: false, numLikes: prePost.numLikes + 1}
            postItems.splice(index, 1, likedPost)
            return {...state, posts: {...state.posts, items: postItems}}
        }
        case types.SET_UNLIKE_POST: {
            let {index, _id} = action.payload
            if(typeof index !== 'number' || Number.isNaN(index)) {
                index = state.posts.items.findIndex(post => post._id === _id)
            }
            const postItems = state.posts.items.slice()
            const prePost = postItems[index]
            const likedPost = {...prePost, canLike: true, numLikes: prePost.numLikes - 1}
            postItems.splice(index, 1, likedPost)
            return {...state, posts: {...state.posts, items: postItems}}
        }
        case types.CLEAR_POSTS: {
            return {...state, posts: initState.posts}
        }
        case types.RESET: {
            return initState
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}