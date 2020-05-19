import React, {createContext, useReducer, useEffect} from 'react'
import { reducer } from './reducer'
import { getCookie } from '../services/storage'
import { env, status } from '../config/globals'
import { addToken, setLength, startLoadPost, addPosts, endLoadPost } from './actions'
import { getLengthPosts, getPosts } from '../services/post'
import { dispatchLogger } from '../hooks/useDispatch'
import { message } from 'antd'

export const DataContext = createContext()

export const initState = {
    auth: {
        token: null,
        user: null,
        isAuthenticated: false,
        initLoading: true
    },
    posts: {
        loading: false,
        initLoading: true,
        pagination: {
            length: 0,
            skip: 0,
            limit: 5,
        },
        items: []
    }
}

export const DataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)
    const dispatchWithLogger = dispatchLogger(dispatch)
    useEffect(() => {
        // get token
        const token  = getCookie(env.COOKIE_KEY)
        if(token) {
            setTimeout(() => {
                dispatchWithLogger(addToken(token))
            }, 300)
        }
        // get length of posts in db
        getLengthPosts(token).then(length => {
            dispatchWithLogger(setLength(length))
        })
        // start load posts
        dispatchWithLogger(startLoadPost())
        // get posts
        const { posts: {pagination: {skip, limit}} } = state
        getPosts(skip, limit, token).then(posts => {
            dispatchWithLogger(addPosts(posts))
        }).catch(error => message[error.status || status.error](error.message))
        .finally(_ => {
            // end load
            dispatchWithLogger(endLoadPost())})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}