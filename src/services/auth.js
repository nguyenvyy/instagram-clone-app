import { axios } from '../config/axios';
import { status, messages } from "../config/globals"
import { RequestException } from "../utils"
const pathname = '/auth'
export const registerAccount = async ({email, username, fullname, password}) => {
    try {
        await axios({
            method: 'post',
            url: `${pathname}/register`,
            data: {
                email,
                username,
                fullname,
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
            url: `${pathname}/login`,
            method: 'post',
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
