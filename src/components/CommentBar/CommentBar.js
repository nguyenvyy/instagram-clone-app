import React, { useState } from 'react';
import './CommentBar.css';
import { Input, Button, message } from 'antd';
import { sendNewComment } from '../../services/comment';
import { status, messages } from '../../config/globals';
import { useMemo } from 'react';
export function CommentBar ({
	commentInputRef, 
    authorId, userId, 
    postId, addCommentInLocal,
	token, replyToCommentId,
	setReplyToCommentId
}){
	const [ loading, setLoading ] = useState(false);
	const [ content, setContent ] = useState('');
	const onChange = (e) => setContent(e.target.value);
	const onComment = () => {
		setLoading(true)
		let comment =  {
            byUser: userId, content: content.trim(), 
            postId, postAuthor: authorId
		}
		if(replyToCommentId) {
			comment.replyToCommentId = replyToCommentId
		}
        sendNewComment(comment, token).then(comment => {
            addCommentInLocal(comment)
            setContent('')
        }).catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
            setLoading({ ...loading, like: false });
            message[statusError](messageError);
        }).finally(_ => setLoading(false));
	};
	let timeout = useMemo(() => null, [])
	const onBlur = () => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			setReplyToCommentId(null)
		}, 1000);
	}
	return (
		<div className="comment-bar d-flex justify-between align-items-center">
			<Input.TextArea
				ref={commentInputRef}
				onBlur={onBlur}
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
}

export const MemoizedCommentBar = React.memo(CommentBar)

