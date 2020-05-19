import { axios } from "../config/axios"
import { RequestException } from "../utils"
import {status, messages} from '../config/globals'
export const pathname = '/comments'

export const sendNewComment = (
    { byUser, postId, content, postAuthor },
    token
) => axios({
    method: 'post',
    url: `${pathname}`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    data: {
        byUser, postId, content, postAuthor
    }
}).then(res => res.data.comment)
.catch(_ => {throw new RequestException(status.error, messages.comment.add.false)})
