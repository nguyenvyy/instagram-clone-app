import { types } from "./actions"
import { initState } from "./DataProvider"
import { decode } from 'jsonwebtoken'
import { removeCookie } from "../services/storage"
import { env } from "../config/globals"
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
            removeCookie(env.COOKIE_KEY)
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
                }
            }}
        }
        case types.ADD_POSTS: {
            const posts = action.payload
            const {items, pagination, loading} = state.posts
            const skip = pagination.skip + posts.length 
            const newItems = posts.concat(items)
            return {...state, posts: {
                items: newItems,
                pagination: {
                    ...pagination,
                    skip
                },
                loading
            }}
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