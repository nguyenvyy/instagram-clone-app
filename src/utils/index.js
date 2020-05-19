import moment from 'moment'
import 'moment/locale/vi';
import { messages } from '../config/globals';

export const RequestException = function(status, message) {
    this.status = status
    this.message = message
}

export const checkIsImage = (mimetype) => {
	const acceptImageTypes = [ 'image/png', 'image/jpeg', 'image/gif', 'image/x-icon' ];
	return acceptImageTypes.includes(mimetype);
};

export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  export function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;

        var executeFunction = function () {
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(executeFunction, wait);
    };
};


moment.locale('vi');
export const convertDateToTimeFromNow = (dateString, hasSuffix = true) => {
    return moment(dateString).fromNow(!hasSuffix);

}

export const formatDate = (dateString) => {
    return moment(dateString).format('dddd, DD - MM - YYYY, hh:mm:ss');
}

export const beforeUpload = (file, alerter) => {
	const isJpgOrPng = checkIsImage(file.type);
	if (!isJpgOrPng) {
		alerter.error(messages.upload_img.validate.type);
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		alerter.error(messages.upload_img.validate.size('2MB'));
	}
	return isJpgOrPng && isLt2M;
};