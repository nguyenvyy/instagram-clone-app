import React, { useEffect, useCallback, useState } from 'react';
import './HomePage.css';
import { useStore } from '../../hooks/useStore';
import { FitLoading } from '../../components/common/FitLoading';
import { Alert, message, Row, Col, Grid } from 'antd';
import { MemoizedPost } from '../../components/Post/Post';
import { getPosts, getLengthPosts } from '../../services/post';
import { useDispatch } from '../../hooks/useDispatch';
import { startLoadPost, endLoadPost, addPosts, setLength } from '../../store/actions';
import { status, messages } from '../../config/globals';
import { debounce } from '../../utils';
import UserDefault from '../../assets/images/user-icon.jpg';

export const HomePage = () => {
	const {xxl, xl, lg} = Grid.useBreakpoint()
	const dispatch = useDispatch();
	const { posts: { items, loading, pagination, initLoading }, auth: { token, user } } = useStore();
	const { avatarUrl = UserDefault, username, fullname } = user || {}
	const { length, skip, limit } = pagination;
	const [isScrollBottom, setIsScrollBottom] = useState(false);
	const onScrollToBottom = useCallback((e) => {
		// detect scroll to bottom
		const current = window.innerHeight + window.scrollY
		const max = document.body.offsetHeight - 20
		if (current >= max) {
			setIsScrollBottom(true);
		} else {
			setIsScrollBottom((value) => {
				if (value === false) return value;
				return !value;
			});
		}
	}, []);
	useEffect(
		() => {
			document.addEventListener('scroll', onScrollToBottom);
			return () => {
				// clear listener
				document.removeEventListener('scroll', onScrollToBottom);
			};
		},
		[onScrollToBottom]
	);

	useEffect(
		() => {
			getLengthPosts(token).then((length) => {
				dispatch(setLength(length));
			});
			// start load posts
			dispatch(startLoadPost());
			// get posts
			getPosts(skip, limit, token)
				.then((posts) => {
					dispatch(addPosts(posts));
				})
				.catch((error) => message[error.status || status.error](error.message))
				.finally((_) => {
					// end load
					dispatch(endLoadPost());
				});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const infiniteLoadPost = useCallback(
		debounce(() => {
			if (loading || skip >= length) return;
			dispatch(startLoadPost());
			getPosts(skip, limit, token)
				.then((posts) => {
					dispatch(addPosts(posts));
				})
				.catch(({ status: statusError = status.error, message: messageError = messages.post.get.failed }) => {
					message[statusError](messageError);
				})
				.finally((_) => dispatch(endLoadPost()));
		}, 200),
		[dispatch, length, limit, loading, skip, token]
	);

	useEffect(
		() => {
			if (isScrollBottom === true) {
				infiniteLoadPost();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isScrollBottom]
	);

	if (initLoading) {
		return (
			<div className="container" style={{ marginTop: '200px' }}>
				{' '}
				<FitLoading fontSize="30px" />{' '}
			</div>
		);
	}
	if (initLoading === false && length === 0) {
		return (
			<div className="container" style={{ marginTop: '50px' }}>
				<Alert message="Chưa có bài đăng nào" type="warning" />
			</div>
		);
	}
	return (
		<div className="home-page container d-flex justify-center">
			<div>
				<div className='follower-list'>

				</div>
				<div className="post-list">
					{items.map((post) => (
						<div key={post._id} className="list-item d-flex justify-center">
							<MemoizedPost
								post={post}
								token={token}
								user={user}
								dispatch={dispatch}
							/>
						</div>
					))}
				</div>
				<div className="loading-area">{loading && <FitLoading fontSize="25px" />}</div>
			</div>
			{(xxl || xl) && user && (
				<div className="follow-panel">
					<div className="user-area d-flex align-items-center">
						<img src={avatarUrl} alt="avatar-user"/>
						<div className="user-info d-flex">
							<b>{username}</b>
							<span>{fullname}</span>
						</div>
					</div>
					<div className="d-flex justify-between">
						<b>
							<span>
								Gợi ý cho bạn
							</span>
						</b>
						<b>Xem tất cả</b>
					</div>
				</div>
			)}

		</div>
	);
};
