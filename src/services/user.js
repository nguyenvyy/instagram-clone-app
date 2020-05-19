import { axios } from "../config/axios";
import { RequestException } from "../utils"
import {status, messages} from '../config/globals'

const pathname = '/users'
export const getNotificationsOfUser = (userId, limit, skip, token) => axios({
    method: 'get',
    url: `${pathname}/${userId}/notifications`,
    headers: {
        Authorization: `Bearer ${token}`
    },
    params: {
        skip, limit
    }
}).then(res => res.data.notifications)
.catch(_ => {throw new RequestException(status.error, messages.notification.get.failed)})