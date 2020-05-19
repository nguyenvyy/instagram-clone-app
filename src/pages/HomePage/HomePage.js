import React, { useEffect, useCallback, useState } from 'react';
import './HomePage.css';
import { useStore } from '../../hooks/useStore';
import { FitLoading } from '../../components/common/FitLoading';
import { Alert, message } from 'antd';
import { Post } from '../../components/Post/Post';
import { getPosts } from '../../services/post';
import { useDispatch } from '../../hooks/useDispatch';
import { startLoadPost, endLoadPost, addPosts } from '../../store/actions';
import { status, messages } from '../../config/globals';
import { debounce } from '../../utils';
export const HomePage = () => {
	const dispatch = useDispatch();
	const { posts: { items, loading, pagination, initLoading }, auth: { token, user } } = useStore();
	const { length, skip, limit } = pagination;
	const [ isScrollBottom, setIsScrollBottom ] = useState(false);
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
		[ onScrollToBottom ]
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
		[ dispatch, length, limit, loading, skip, token ]
	);

	useEffect(
		() => {
			if (isScrollBottom === true) {
				infiniteLoadPost();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ isScrollBottom ]
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
		<div className="home-page container">
			<div className="post-list">
				{items.map((post, index) => (
					<div key={post._id + index} className="list-item d-flex justify-center">
						<Post 
							post={post} index={index}
							token={token}
							user={user}
							dispatch={dispatch}
							/>
					</div>
				))}
			</div>
			<div className="loading-area">{loading && <FitLoading fontSize="25px" />}</div>
		</div>
	);
};
