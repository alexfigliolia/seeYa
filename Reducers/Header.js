const initialState = {
	searchValue: '',
	searching: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_SEARCH_VALUE':
			return Object.assign({}, state, { searchValue: action.value });
		case 'SEARCH':
			return Object.assign({}, state, { searching: !state.searching });
		default:
			return state;
	}
}