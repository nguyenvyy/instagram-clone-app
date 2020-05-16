import React, {createContext, useReducer} from 'react'
import { reducer } from './reducer'

export const DataContext = createContext()

export const initState = {
    auth: {
        token: null,
        user: null,
        isAuthenticated: false
    }
}

export const DataProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    )
}