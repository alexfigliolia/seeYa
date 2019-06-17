export const beginUpload = img => {
	return { type: 'BEGIN_UPLOAD', img }; 
}

export const setImgUrl = url => {
	return { type: 'SET_IMG_URL', img };
}