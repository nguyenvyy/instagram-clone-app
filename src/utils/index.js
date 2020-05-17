
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