import React from 'react'
import './CommentList.css'
import { MemoizedComment } from '../Comment/Comment'

export function CommentList({ 
    comments, setReplyToCommentId,
    token, commentInputRef
 }) {

    return (
        <div className="comment-list">
            {comments.map((comment) => <MemoizedComment
                setReplyToCommentId={setReplyToCommentId} commentInputRef={commentInputRef}
                token={token} comment={comment} key={comment._id} />)}
        </div>
    )
}

export const MemoizedCommentList = React.memo(CommentList)