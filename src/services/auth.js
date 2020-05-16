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
		await axios({
			url: 'auth/login',
			data: {
				username,
				password
			}
        });
		return {
				status: status.success, 
				message: messages.register.success,
				
			}
    } catch (error) {
        throw new RequestException(status.error, messages.register.failed)
    }
};
