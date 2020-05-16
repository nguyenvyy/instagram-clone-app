import { axios } from '../config/axios';
import { status, messages } from "../config/globals"
import { RequestException } from "../utils"

export const registerAccount = async ({email, username, fullName, password}) => {
    try {
        await axios({
            method: 'post',
            url: '/auth/register',
            data: {
                email,
                username,
                fullName,
                password
            }
        })
        return {status: status.success, message: messages.register.success}
    } catch (error) {
		const {message = messages.register.failed} = (error.response && error.response.data) || {} 
        throw new RequestException(status.error, message)
    }
}
export const login = async (username, password) => {
	try {
		const response = await axios({
			url: 'auth/login',
			data: {
				username,
				password
			}
        });
        const {token, user} = response.data
        if(!token) throw new Error()
		return {
				status: status.success, 
				message: messages.login.success,
                token,
                user
			}
    } catch (error) {
        const {message = messages.login.failed} = (error.response && error.response.data) || {} 
        throw new RequestException(status.error, message)
    }
};
