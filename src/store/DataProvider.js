import React, {createContext, useReducer, useEffect} from 'react'
import { reducer } from './reducer'
import { getCookie } from '../services/storage'
import { env } from '../config/globals'
import { addToken } from './actions'

export const DataContext = createContext()

export const initState = {
    auth: {
        token: null,
        user: null,
        isAuthenticated: false,
        initLoading: true
    }
}

export const DataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        const token  = getCookie(env.COOKIE_KEY)
        if(token) {
            setTimeout(() => {
                dispatch(addToken(token))
            }, 500)
        }
    }, [])

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}