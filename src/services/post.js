import { axios } from '../config/axios';
import { status, messages } from "../config/globals"
import { RequestException } from "../utils"

export const sendNewPost = async ({byUser, caption, imageUrl}, token, user) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/posts',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                byUser,
                caption,
                imageUrl
            }
        })
        const post = {...res.data.post, byUser: user}
        return {status: status.success, post, message: messages.post.add.success}
    } catch (error) {
        throw new RequestException(status.error, messages.post.add.failed)
    } 
} 