import React, { useState, useMemo } from 'react';
import './SignInPage.css';
import { useRouter } from '../../hooks/useRouter';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { login } from '../../services/auth';
import { useDispatch } from '../../hooks/useDispatch';
import { addToken, addUser } from '../../store/actions';

export const SignInPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [ isValidForm, setIsValidForm ] = useState(false);
	const onChangeFields = (_, allFields) => {
		const isValid = allFields.every((field) => field.errors.length === 0 && field.touched === true);
		setIsValidForm(isValid);
	};

	const [ loading, setLoading ] = useState(false);
	const initialValues = useMemo(() => {
		const { username = '', password = '' } = router.state || {};
		if (username) setIsValidForm(true);
		return { username, password };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onFinish = ({ username, password }) => {
		setLoading(true);
		login(username, password)
			.then((res) => {
				setLoading(false);
				const { token, user } = res;
				message[res.status](res.message);
				dispatch(addToken(token));
				dispatch(addUser(user));
				let to = '/'
				if (router.state && router.state.from) {
					to = router.state.from
				}
				router.push(to);
			})
			.catch((error) => {
				setLoading(false);
				message[error.status](error.message);
			});
	};

	return (
		<div className="sign-in-page d-flex-center flex-column">
			<div className="card">
				<div className="title" />
				<div className="sign-in-form">
					<Form
						initialValues={initialValues}
						onFieldsChange={onChangeFields}
						scrollToFirstError
						name="sign-in"
						onFinish={onFinish}
					>
						<Form.Item
							name="username"
							rules={[ { required: true, message: 'Hãy nhập tên người dùng của bạn!' } ]}
							hasFeedback
						>
							<Input className="form-input" placeholder="Tên người dùng" />
						</Form.Item>
						<Form.Item
							name="password"
							hasFeedback
							rules={[ { required: true, message: 'Hãy nhập mật khẩu của bạn!' } ]}
						>
							<Input.Password className="form-input" placeholder="Mật khẩu" />
						</Form.Item>
						<Form.Item>
							<Button
								disabled={!isValidForm}
								type="primary"
								htmlType="submit"
								loading={loading}
								className="form-button"
							>
								Đăng Nhập
							</Button>
						</Form.Item>
					</Form>
					<Link className="forgot-link" to="/forget">
						Bạn quên mật khẩu?
					</Link>
				</div>
			</div>
			<div className="card d-flex-center">
				<span>
					Bạn chưa có tài khoản? <Link to="/sign-up">Đăng ký</Link>
				</span>
			</div>
		</div>
	);
};
