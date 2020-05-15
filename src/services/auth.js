import { axios } from '../config/axios';

export const login = async (username, password) => {
	try {
		const res = await axios({
			url: 'auth/login',
			data: {
				username,
				password
			}
        });
        return res.data
	} catch (error) {
        return error
    }
};
