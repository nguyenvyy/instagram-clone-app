import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Tag, message } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import './Post.css';
import { status, messages } from '../../config/globals';
import UserDefault from '../../assets/images/user-icon.jpg';
import { MemoizedCommentBar } from '../CommentBar/CommentBar';
import { setLikedPost, setUnlikePost } from '../../store/actions';
import { likePost, unlikePost, getCommentsOfPost } from '../../services/post';
import { MemoizedComment } from '../Comment/Comment';
import { formatDate } from '../../utils';

export function Post({ post, token, user, dispatch }) {
	const { numLikes, _id, byUser, caption, imageUrl, createdAt, canLike = true, commentCount = 0 } = post;
	const { avatarUrl = UserDefault, username, _id: authorId } = byUser || {
		avatarUrl: UserDefault,
		username: <Tag color="#f50">???</Tag>
	};
	const [ comments, setComments ] = useState({ server: [], local: [] });
	const displayComments = useMemo(() => comments.server.concat(comments.local), [comments.local, comments.server])
	const localCommentCount = useMemo(() => commentCount + comments.local.length, [
		commentCount,
		comments.local.length
	]);
	const [replyToCommentId, setReplyToCommentId] = useState(null)
	const commentInputRef = useRef(null)

	const addCommentInLocal = (comment) => {
		comment = { ...comment, byUser: user };
		if(replyToCommentId !== null) {
			let repliedCommentIndex
			let isAddAtLocal = true
			// find comment at local
			repliedCommentIndex = comments.local.findIndex(comment => comment._id === replyToCommentId)
			if(repliedCommentIndex === -1) {
				// find comment at server 
				repliedCommentIndex = comments.server.findIndex(comment => comment._id === replyToCommentId)
				isAddAtLocal = repliedCommentIndex !== -1 ? false : isAddAtLocal
			}

			if(repliedCommentIndex !== -1) {
				let newComments = isAddAtLocal ? comments.local.slice() : comments.server.slice()
				let repliedComment = {...newComments[repliedCommentIndex]}
				repliedComment.numReplyComments += 1
				repliedComment.replyComments = repliedComment.replyComments.concat(comment)
				newComments.splice(repliedCommentIndex, 1, repliedComment)

				return setComments(({local, server}) => {
					let newLocal = local
					let newServer = server
					if(isAddAtLocal) {
						newLocal = newComments
					} else {
						newServer = newComments
					}
					return {local: newLocal, server: newServer}
				})
			}
			getCommentsOfPost(0, commentCount, _id, token)
			.then((comments) => {
				console.log('reload comment')
				setComments(({ local }) => ({ server: comments, local }));
			})
			.catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
				message[statusError](messageError);
			})
			return

		} else {
			setComments(({ local, server }) => ({ server, local: local.concat(comment) }));
		}
	};
	const [ isShowComment, setIsShowComment ] = useState(false);
	const [ isLoadedComment, setIsLoadedComment ] = useState(false);
	useEffect(
		() => {
			if (isLoadedComment === false && isShowComment === true && commentCount > 0) {
				setIsLoadedComment(true);
				getCommentsOfPost(0, commentCount, _id, token)
					.then((comments) => {
						setComments(({ local }) => ({ server: comments, local }));
					})
					.catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
						message[statusError](messageError);
					})
			}
		},
		[ _id, commentCount, isLoadedComment, isShowComment, token ]
	);
	const showComment = () => setIsShowComment(true);
	const hiddenComment = () => setIsShowComment(false);

	const onLikePost = () => {
		dispatch(setLikedPost(_id));
		likePost(_id, token)
			.catch(_ => {
				dispatch(setUnlikePost(_id));
			})
		
	};
	const onUnlikePost = () => {
		dispatch(setUnlikePost(_id));
		unlikePost(_id, token)
			.catch(_ => {
				dispatch(setLikedPost(_id));
			})
	};



	return (
		<div className="post">
			<div className="card">
				<div className="card__header d-flex justify-between">
					<div className="author-info">
						<img src={avatarUrl} alt="author-img" />
						<span className="author-name"> {username} </span>
					</div>
					<div className="d-flex align-items-center">
						<span className="time">{formatDate(createdAt)}</span>
						<EllipsisOutlined className="pointer" />
					</div>
				</div>
				<div className="card__img d-flex-center">
					<img src={imageUrl} alt="post-img" />
				</div>
				<div className="card__content">
					<div className="like-bar d-flex align-items-center">
						<span className={`like-icon ${canLike ? '' : 'liked'} pointer`}>
							{canLike ? (
								<HeartOutlined   onClick={onLikePost} />
							) : (
								<HeartFilled   onClick={onUnlikePost} />
							)}
						</span>
						<span className="num-likes">{`${numLikes} lượt thích`}</span>
					</div>
					<p className="caption">
						<span>{username}</span>
						{caption}
					</p>
					{localCommentCount > 0 && (
						<div className="comment-area">
							<div
								onClick={isShowComment ? hiddenComment : showComment}
								className="comment-count pointer"
							>
								{localCommentCount} bình luận
							</div>
							{isShowComment && (
								<div className="comment-list">
									{displayComments.map((comment) => <MemoizedComment 
										setReplyToCommentId={setReplyToCommentId} commentInputRef={commentInputRef.current} 
										token={token} comment={comment} key={comment._id} />)}
								</div>
							)}
						</div>
					)}
				</div>
				<div className="card__footer">
					<MemoizedCommentBar
						token={token}
						authorId={authorId}
						userId={user._id}
						postId={_id}
						addCommentInLocal={addCommentInLocal}
						replyToCommentId={replyToCommentId}
						commentInputRef={commentInputRef}
						setReplyToCommentId={setReplyToCommentId}
					/>
				</div>
			</div>
		</div>
	);
};

export const MemoizedPost = React.memo(Post)
