import React, { useState, useEffect } from 'react';
import { message, Alert } from 'antd';
import './NotificationFrame.css';
import { FitLoading } from '../common/FitLoading';
import { getNotificationsOfUser } from '../../services/user';
import { useStore } from '../../hooks/useStore';
import { status, messages } from '../../config/globals';
import UserDefault from '../../assets/images/user-icon.jpg';
import { Tag } from 'antd';
import { convertDateToTimeFromNow } from '../../utils';

export const NotificationItem = ({ notification }) => {
	const { action, createdAt, byUser } = notification;
	const { avatarUrl = UserDefault, username } = byUser || {
		avatarUrl: UserDefault,
		username: <Tag color="#f50">Đã có lỗi trong quá trình xảy ra</Tag>
	};
	const time = convertDateToTimeFromNow(createdAt, false);

	return (
		<div className="notification-item d-flex align-items-center ">
            <img src={avatarUrl} alt="user-img" />
            <div className="notification-info  d-flex align-items-center justify-between ">
                <div className="d-flex flex-column">
                    <span className="by-username"> {username} </span>
                    <span className="content">
                        {`đã ${messages.notification.action[action]} bài viết của bạn`}
                    </span>
                </div>
			    <span className="time">{time}</span>
            </div>
		</div>
	);
};

export const NotificationFrame = () => {
	const { auth: { token, user } } = useStore();
	const [ loading, setLoading ] = useState(false);
	const [ notifications, setNotifications ] = useState([]);
	const [ isLoaded, setIsLoaded ] = useState(false);
	useEffect(() => {
		setLoading(true);
		getNotificationsOfUser(user._id, 20, 0, token)
			.then((notifications) => {
				setNotifications(notifications);
			})
			.catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
				message[statusError](messageError);
			})
			.finally((_) => {
				setLoading(false);
				setIsLoaded(true);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (loading) return <FitLoading height="50px" fontSize="18px" />;
	if (isLoaded && notifications.length === 0) {
		return (
			<div className="empty-notification">
				<Alert message="Không có thông báo nào" type="info" />
			</div>
		);
	}
	return (
		<div className="notification-list">
			{notifications.map((notification) => (
				<NotificationItem key={notification._id} notification={notification} />
			))}
		</div>
	);
};
