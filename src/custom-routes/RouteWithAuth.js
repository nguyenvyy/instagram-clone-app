import React from 'react'
import { useStore } from '../hooks/useStore'
import { Redirect, Route } from 'react-router-dom'
import { useRouter } from '../hooks/useRouter'

export const RouteWithAuth = ({
    redirectPath = '/sign-in',
    path,
    children, 
    ...rest}) => {
    const store = useStore()
    const router = useRouter()

    return store.auth.isAuthenticated === true ? (
        <Route path={path} {...rest}>
            {children}
        </Route>
    ) : (
        <Redirect to={{pathname: redirectPath, state: {from: router.pathname}}} />
    )

}