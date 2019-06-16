export const updateSearchValue = value => {
	return dispatch => {
		dispatch({ type: 'UPDATE_SEARCH_VALUE', value });
		dispatch(searchFriends(value));
	}
}

export const search = () => {
	return { type: 'SEARCH' };
}

const searchFriends = value => {
	return (dispatch, getState) => {
		const { friends } = getState().Proximity;
		if(value === '') {
			dispatch({ type: 'SEARCH_FRIENDS', results: friends });
			return;
		}
		const results = [];
		for(let i = 0; i < friends.length; i++) {
			const { name } = friends[i];
			if(name.toLowerCase().indexOf(value.toLowerCase()) !== -1) results.push(friends[i]);
		}
		dispatch({ type: 'SEARCH_FRIENDS', results });
	}
}