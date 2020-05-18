import React from 'react';
import { useStore } from '../hooks/useStore';
import { Redirect, Route } from 'react-router-dom';
import { useRouter } from '../hooks/useRouter';
import { getCookie } from '../services/storage';
import { env } from '../config/globals';
import { FullLoading } from '../components/common/FitLoading';

export const RouteWithAuth = ({ redirectPath = '/sign-in', path, children, ...rest }) => {
	const store = useStore();
	const router = useRouter();
	const existedToken = getCookie(env.COOKIE_KEY);
	if (store.auth.isAuthenticated) {
		return (
			<Route path={path} {...rest}>
				{children}
			</Route>
		);
    }
    if(existedToken && store.auth.initLoading === true) {
        return <FullLoading />
	}
	
	const from = router.pathname
	return <Redirect to={{ pathname: redirectPath, state: { from } }} />;
};
