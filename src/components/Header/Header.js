import React, { useState, useEffect } from 'react';
import './Header.css';
import Logo from '../../assets/images/logo.png';
import UserIcon from '../../assets/images/user-icon.jpg';
import { Input } from 'antd';
import { NavLink } from 'react-router-dom';
import {
	HomeFilled,
	HomeOutlined,
	HeartFilled,
	HeartOutlined,
	PlusSquareFilled,
	PlusSquareOutlined
} from '@ant-design/icons';
import { useRouter } from '../../hooks/useRouter';
import { AddPostModal } from '../AddPostModal/AddPostModal';
import { useStore } from '../../hooks/useStore';
import { NotificationFrame } from '../NotificationFrame/NotificationFrame';

export const Header = () => {
	const { auth: { user, token } } = useStore()
	const router = useRouter();
	const [currentPath, setCurrentPath] = useState('/');
	const onChangePath = (path) => setCurrentPath(path);
	useEffect(
		() => {
			setCurrentPath(router.pathname);
		},
		[router.pathname]
	);
	const closeModal = () => {
		setCurrentPath(router.pathname)
	}
	return (
		<header className="header ">
			<div className="container d-flex justify-between align-items-center">
				<img className="logo" src={Logo} alt="logo" />
				<div className="search">
					<Input placeholder="Tìm kiếm" />
				</div>
				<div className="menu">
					<ul className="d-flex align-items-center">
						<li>
							<NavLink className="d-flex-center" to="/">
								{currentPath === '/' ? (
									<HomeFilled className="menu-icon" />
								) : (
										<HomeOutlined
											onClick={() => onChangePath('/')}
											className="menu-icon" />
									)}
							</NavLink>
						</li>
						<li>
							<div className="d-flex-center pointer">
								{currentPath === '/new-post' ? (
									<PlusSquareFilled className="menu-icon" />
								) : (
										<PlusSquareOutlined
											onClick={() => onChangePath('/new-post')}
											className="menu-icon" />
									)}
							</div>
						</li>
						<li>
							<div className="d-flex-center  notification">
								{currentPath === '/notifications' ? (
									<>
										<HeartFilled
											onClick={() => onChangePath(router.pathname)}
											className="menu-icon pointer" />
										<div className="notification-frame">
											<NotificationFrame />
										</div>
									</>
								) : (
										<HeartOutlined
											onClick={() => onChangePath('/notifications')}
											className="menu-icon pointer" />
									)}
							</div>
						</li>
						<li>
							<NavLink className="d-flex-center" to={`/${user.username}`}>
								<img
									className={`user-icon ${currentPath === `/${user.username}` ? 'active' : ''}`}
									src={UserIcon}
									alt="user-icon"
									onClick={() => onChangePath(`/${user.username}`)}
								/>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
			<div className="modal-area">
				{currentPath === '/new-post' &&
					<AddPostModal user={user} token={token} close={closeModal} />}
			</div>
		</header>
	);
};
