import React, { useState } from 'react'
import './Comment.css'
import UserDefault from '../../assets/images/user-icon.jpg';
import { Tag } from 'antd';
import { convertDateToTimeFromNow } from '../../utils';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { likeComment, unlikeComment } from '../../services/comment'
import { MemoizedCommentList } from '../CommentList/CommentList';
export function Comment({ 
    comment: preComment, token, 
    commentInputRef, setReplyToCommentId }) {
    const { 
        _id, content, createdAt, 
        byUser, numLikes , canLike = true, 
        numReplyComments, replyComments, replyToCommentId } = preComment
    const { avatarUrl = UserDefault, username } = byUser || {
        avatarUrl: UserDefault,
        username: <Tag color="#f50">Đã có lỗi trong quá trình xảy ra</Tag>
    };
    const time = convertDateToTimeFromNow(createdAt, false)
    const [comment, setComment] = useState({canLike, numLikes})
    const onLikeComment = () => {
        setComment(({numLikes}) => ({canLike: false, numLikes: numLikes + 1}))
        likeComment(_id, token).catch(_ => {
            setComment({canLike: true, numLikes: comment.numLikes - 1})
        })
    }
    const onUnlikeComment = () => {
        setComment({canLike: true, numLikes: comment.numLikes - 1})
        unlikeComment(_id, token).catch(_ => {
            setComment(({numLikes}) => ({canLike: false, numLikes: numLikes + 1}))
        })
    }
    const onClickReply = () => {
        if(commentInputRef && commentInputRef.focus) {
            commentInputRef.focus()
        }
        setReplyToCommentId(replyToCommentId || _id)
    }

    const [isShowReplyComments, setIsShowReplyComments] = useState(false)
    const showReplyComments = () => setIsShowReplyComments(true)
    const hiddenReplyComments = () => setIsShowReplyComments(false)

    return (
        <div className="comment">
            <div>
                <div className="d-flex">
                    <img src={avatarUrl} alt="author-img" />
                    <p className="content">
                        <span className="author-name">
                            {username}
                        </span>
                        {content}
                    </p>
                </div>
                <div className="reaction">
                    <span>{time}</span>
                    {comment.numLikes > 0 && (
                        <b className="pointer"> {comment.numLikes} lượt thích</b>
                    )}
                    <b onClick={onClickReply} className="pointer">Trả lời</b>
                </div>
                {(numReplyComments > 0 && replyToCommentId === null) && (
                    <div className='reply-comments-area'>
                        <div 
                        onClick={isShowReplyComments ? hiddenReplyComments : showReplyComments}
                        className="d-flex align-items-center pointer">
                            <span className='dash-line'/>
                            <b >
                                {isShowReplyComments ? 'Ẩn câu trả lời' : `Xem câu trả lời ${numReplyComments}`}
                            </b>
                        </div>
                        { isShowReplyComments && (
                            <div className='reply-comment-list'>
                                <MemoizedCommentList  
                                    comments={replyComments}
                                    setReplyToCommentId={setReplyToCommentId}
                                    token={token}
                                    commentInputRef={commentInputRef}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <span className={`like-icon ${comment.canLike ? '' : 'liked'} pointer`}>
                {comment.canLike ? (
                    <HeartOutlined onClick={onLikeComment} />
                ) : (
                        <HeartFilled onClick={onUnlikeComment} />
                    )}
            </span>
        </div>
    )
}

export const MemoizedComment = React.memo(Comment)