import { axios } from "../config/axios"
import { RequestException } from "../utils"
import {status, messages} from '../config/globals'
export const pathname = '/comments'

export const sendNewComment = (
    comment,
    token
) => axios({
    method: 'post',
    url: `${pathname}`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    data: {
        ...comment
    }
}).then(res => res.data.comment)
.catch(_ => {throw new RequestException(status.error, messages.comment.add.false)})

export const likeComment = (_id, token) => axios({
    method: 'patch',
    url: `${pathname}/${_id}/like`,
    headers: {
        Authorization : `Bearer ${token}`
    }
})
export const unlikeComment = (_id, token) => axios({
    method: 'patch',
    url: `${pathname}/${_id}/unlike`,
    headers: {
        Authorization : `Bearer ${token}`
    }
})