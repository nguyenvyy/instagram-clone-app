export const env = {
	NODE_ENV: process.env.NODE_ENV,
	SERVER_URL: process.env.NODE_ENV === 'production' ? 
		process.env.REACT_APP_SERVER_URL : 'http://localhost:8080/api/v1',
	COOKIE_KEY: process.env.NODE_ENV === 'production' ? 
	process.env.REACT_APP_COOKIE_KEY : 'instagram-cookie',
};

export const status = {
	error: 'error',
	success: 'success',
	warning: 'warning'
};

export const messages = {
	action: {
		failed: 'Hành động thất bại!'
	},
    register: {
        success: 'Đăng ký tài khoản thành công',
        failed: 'Đăng ký tài khoản thất bại!',
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
			failed: 'Đăng bài thất bại!'
		},
		get: {
			success: 'Tải bài thành công',
			failed: 'Tải bài thất bại!'
		},
		like: {
			failed: 'Like bài thất bại!'
		}
	},
	comment: {
		add: {
			false: 'Bình luận thất bại!'
		},
		get: {
			failed: 'Tải bình luận thất bại!'
		}
	},
	notification: {
		get: {
			failed: 'Tải thông báo thất bại!'
		},
		action: {
			like: 'thích',
			comment: 'bình luận'
		}
	}
}

export default {
	env,
	status
};
