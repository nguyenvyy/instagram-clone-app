import React, { createContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer';
import { getCookie } from '../services/storage';
import { env } from '../config/globals';
import { addToken } from './actions';

export const DataContext = createContext();

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
			limit: 5
		},
		items: []
	}
};

export const DataProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initState);
	useEffect(() => {
		// get token
		const token = getCookie(env.COOKIE_KEY);
		if (token) {
			dispatch(addToken(token));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};
