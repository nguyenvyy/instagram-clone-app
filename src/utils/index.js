import moment from 'moment'
import 'moment/locale/vi';

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
export const convertDateToTimeFromNow = (dateString) => {
    return moment(dateString).fromNow();

}

export const formatDate = (dateString) => {
    return moment(dateString).format('dddd, DD - MM - YYYY, hh:mm:ss');
}

