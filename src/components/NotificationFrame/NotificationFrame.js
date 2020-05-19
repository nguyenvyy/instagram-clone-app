import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import './NotificationFrame.css'
import { FitLoading } from '../common/FitLoading'
import { getNotificationsOfUser } from '../../services/user'
import { useStore } from '../../hooks/useStore'
import { status, messages } from '../../config/globals'

export const NotificationFrame = () => {
    const {auth: {token, user}} = useStore()
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        setLoading(true)
        getNotificationsOfUser(user._id, 100, 0, token).then(notifications => {
            setNotifications(notifications)
        })
        .catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
            message[statusError](messageError);
        })
        .finally((_) => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if(loading) return <FitLoading fontSize='18px' />
    return (
        <div className="notification-list">
            {
               
            }
        </div>
    )
}