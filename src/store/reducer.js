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
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}