import React, { useState } from 'react';
import './CommentBar.css';
import { Input, Button, message } from 'antd';
import { sendNewComment } from '../../services/comment';
import { status, messages } from '../../config/globals';
export const CommentBar = ({ 
    authorId, userId, 
    postId, addCommentInLocal,
    token
}) => {
	const [ loading, setLoading ] = useState(false);
	const [ content, setContent ] = useState('');
	const onChange = (e) => setContent(e.target.value);
	const onComment = () => {
        setLoading(true)
        sendNewComment({
            byUser: userId, content: content.trim(), 
            postId, postAuthor: authorId
        }, token).then(comment => {
            addCommentInLocal(comment)
            setContent('')
        }).catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
            setLoading({ ...loading, like: false });
            message[statusError](messageError);
        }).finally(_ => setLoading(false));
	};
	return (
		<div className="comment-bar d-flex justify-between align-items-center">
			<Input.TextArea
				value={content}
				onChange={onChange}
				allowClear
				placeholder="Thêm bình luận"
				autoSize={{ maxRows: 4, minRows: 1 }}
			/>
            <Button loading={loading} 
                disabled={content.trim() ? false : true} 
                onClick={onComment}>
				Đăng
			</Button>
		</div>
	);
};
