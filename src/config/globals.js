export const env = {
	NODE_ENV: process.env.NODE_ENV,
	SERVER_URL: process.env.REACT_APP_SERVER_URL || 'http://localhost:8080/api/v1',
	COOKIE_KEY: process.env.REACT_APP_COOKIE_KEY || 'instagram-cookie'
};
export const status = {
	error: 'error',
	success: 'success',
	warning: 'warning'
};

export const messages = {
    register: {
        success: 'Đăng ký tài khoản thành công',
        failed: 'Đăng ký tài khoản thất bại',
	},
	login: {
		success: 'Đăng nhập thành công',
		failed: 'Tên người dùng hoặc mật khẩu không chính xác'
	},
	upload_img: {
		validate: {
			type: 'Ảnh không hợp lệ',
			size: size => `Ảnh phải nhỏ hơn ${size}`
		},
	},
	post: {
		add: {
			success: 'Đăng bài thành công',
			failed: 'Đăng bài thất bại'
		}
	}
}

export default {
	env,
	status
};
