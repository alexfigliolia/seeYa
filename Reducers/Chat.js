const initialState = {
	conversations: [{
		id: 1, 
		user: 'George Figliolia',
		image: null
	}, {
		id: 2, 
		user: 'Erica Figliolia',
		image: null
	}, {
		id: 3, 
		user: 'Steve Figliolia',
		image: null
	}, {
		id: 4, 
		user: 'Dana Figliolia',
		image: null
	}, {
		id: 5, 
		user: 'Ronald Figliolia',
		image: null
	}, {
		id: 6, 
		user: 'Vincent Figliolia',
		image: null
	}],
}

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
} 