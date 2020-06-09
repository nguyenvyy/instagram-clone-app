import React, { 
	useEffect, 
	// useState
 } from 'react';
import { Button, 
	// Upload, message
 } from 'antd';
import './ProfilePage.css';
import { useDispatch } from '../../hooks/useDispatch';
import { clearAuth } from '../../store/actions';
import { useRouter } from '../../hooks/useRouter';
import { useStore } from '../../hooks/useStore';
// import { beforeUpload, getBase64 } from '../../utils';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export const ProfilePage = () => {
	const dispatch = useDispatch();
	const { auth: { user } } = useStore();
    const router = useRouter();
    // const [ loading, setLoading ] = useState({ upload: false, request: false });
	const signOut = () => {
		dispatch(clearAuth());
	};
	useEffect(
		() => {
			if (router.pathname !== user.username) {
				router.replace(`/${user.username}`);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ router.pathname, user.username ]
    );
    // const [imageUrl, setImageUrl] = useState(user.setImageUrl)
    // const handleChangeImageUrl = (info) => {
	// 	if (info.file.status === 'uploading') {
	// 		setLoading({ ...loading, upload: true });
	// 		return;
	// 	}
	// 	if (info.file.status === 'done') {
	// 		// Get this url from response in real world.
	// 		getBase64(info.file.originFileObj, (imageUrl) => {
	// 			setLoading({ ...loading, upload: false });
	// 		});
	// 	}
    // };
    
    // const uploadButton = (
    //     <div className="upload-button">
    //         {loading.upload ? <LoadingOutlined /> : <PlusOutlined />}
    //         <div className="ant-upload-text">Upload</div>
    //     </div>
    // );

	return (
		<div className="profile-page d-flex-center flex-column">
			<h3>Thay đỗi ảnh đại diện</h3>

			<div className="upload-img d-flex-center">
				{/* <Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					beforeUpload={(file) => beforeUpload(file, message)}
					onChange={handleChangeImageUrl}
				>
					{post.imageUrl ? <img src={post.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
				</Upload> */}
			</div>
			<Button onClick={signOut}>Đăng xuất</Button>
		</div>
	);
};
