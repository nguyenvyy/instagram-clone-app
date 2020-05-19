import React, { useState, useMemo, useEffect } from 'react';
import { Tag, message } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartFilled, SyncOutlined } from '@ant-design/icons';
import './Post.css';
import { status, messages } from '../../config/globals';
import UserDefault from '../../assets/images/user-icon.jpg';
import { CommentBar } from '../CommentBar/CommentBar';
import { setLikedPost } from '../../store/actions';
import { likePost, getCommentsOfPost } from '../../services/post';
import { Comment } from '../Comment/Comment';
import { formatDate } from '../../utils';

export const Post = React.memo(function Post({ post, index, token, user, dispatch }) {
	const { likeByIds, _id, byUser, caption, imageUrl, createdAt, canLike = true, commentCount = 0 } = post;
	const { avatarUrl = UserDefault, username, _id: authorId } = byUser || {
		avatarUrl: UserDefault,
		username: <Tag color="#f50">Đã có lỗi trong quá trình xảy ra</Tag>
	};
	const [ loading, setLoading ] = useState({ like: false, comment: false });
	const [ comments, setComments ] = useState({ server: [], local: [] });
	const localCommentCount = useMemo(() => commentCount + comments.local.length, [
		commentCount,
		comments.local.length
	]);
	const addCommentInLocal = (comment) => {
		comment = { ...comment, byUser: user };
		const { local, server } = comments;
		setComments({ server, local: local.concat(comment) });
	};
	const [ isShowComment, setIsShowComment ] = useState(false);
	const [ isLoadedComment, setIsLoadedComment ] = useState(false);
	useEffect(
		() => {
			if (isLoadedComment === false && isShowComment === true && commentCount > 0) {
				setIsLoadedComment(true);
				setLoading((loading) => ({ ...loading, comment: true }));
				getCommentsOfPost(0, commentCount, _id, token)
					.then((comments) => {
						setComments(({ local }) => ({ server: comments, local }));
					})
					.catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
						message[statusError](messageError);
					})
					.finally((_) => setLoading((loading) => ({ ...loading, comment: false })));
			}
		},
		[ _id, commentCount, isLoadedComment, isShowComment, token ]
	);
	const showComment = () => setIsShowComment(true);
	const hiddenComment = () => setIsShowComment(false);

	const onLikePost = () => {
		setLoading({ ...loading, like: true });
		likePost(_id, user._id, token)
			.then((post) => {
				setLoading({ ...loading, like: false });
				dispatch(setLikedPost(_id, post, index));
			})
			.catch(({ status: statusError = status.error, message: messageError = messages.action.failed }) => {
				setLoading({ ...loading, like: false });
				message[statusError](messageError);
			});
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
						<span className="like-icon">
							{loading.like ? (
								<SyncOutlined spin />
							) : canLike ? (
								<HeartOutlined className="pointer" onClick={onLikePost} />
							) : (
								<HeartFilled />
							)}
						</span>
						<span className="num-likes">{`${likeByIds.length} lượt thích`}</span>
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
									{/* comment in server */}
									{comments.server.map((comment) => <Comment comment={comment} key={comment._id} />)}
									{/* comment in local */}
									{comments.local.map((comment) => <Comment comment={comment} key={comment._id} />)}
								</div>
							)}
						</div>
					)}
				</div>
				<div className="card__footer">
					<CommentBar
						token={token}
						authorId={authorId}
						userId={user._id}
						postId={_id}
						addCommentInLocal={addCommentInLocal}
					/>
				</div>
			</div>
		</div>
	);
});
