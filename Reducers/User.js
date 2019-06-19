const initialState = {
	username: 'Alex Figliolia',
	email: 'alexfigliolia@gmail.com',
	userID: null,
	image: null,
	friends: 500,
	following: 100,
	followers: 30000,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'BEGIN_UPLOAD':
			return Object.assign({}, state, { image: action.img, });
		case 'SET_IMG_URL':
			return Object.assign({}, state, { image: action.url });
		default:
			return state;
	}
}