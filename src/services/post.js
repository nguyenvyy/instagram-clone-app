import { axios } from '../config/axios';
import { status, messages } from "../config/globals"
import { RequestException } from "../utils"
const pathname = '/posts'
export const sendNewPost = async ({byUser, caption, imageUrl}, token, user) => {
    try {
        const res = await axios({
            method: 'post',
            url: pathname,
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

export const getLengthPosts = (token) => axios({
    method: 'get',
    url: `${pathname}/length`,
    headers: {
        Authorization: `Bearer ${token}`        
    }
}).then(res => res.data.length)
.catch(error => 0)