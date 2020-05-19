import React from 'react'
import './Comment.css'
import UserDefault from '../../assets/images/user-icon.jpg';
import { Tag } from 'antd';
import { convertDateToTimeFromNow } from '../../utils';

export const Comment = ({comment}) => {
    const {content, createdAt, byUser} = comment
    const { avatarUrl = UserDefault, username, _id: authorId } = byUser || {
		avatarUrl: UserDefault,
		username: <Tag color="#f50">Đã có lỗi trong quá trình xảy ra</Tag>
    };
    const time = convertDateToTimeFromNow(createdAt)
    return (
        <div className="comment d-flex">
            <img src={avatarUrl} alt="author-img" />
            <div>
                <p className="content">
                    <span className="author-name">
                        {username}
                    </span>
                    {content}
                </p>
                <div className="time">{time}</div>
            </div>
        </div>
    )
}