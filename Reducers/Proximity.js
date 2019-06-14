const initialState = {
	friends: [],
	searchResults: [],
	latitude: null,
  longitude: null,
  error: null,
  loadingFriends: true,
  watching: false,
  showMarkers: false,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_LAT_LONG':
			const { latitude, longitude, watching } = action;
			return Object.assign({}, state, { latitude, longitude, error: null, watching });
		case 'SET_ERROR':
			return Object.assign({}, state, { error: action.message });
		case 'GET_FRIENDS':
			return Object.assign({}, state, { 
				friends: action.friends, 
				searchResults: action.friends,
				loadingFriends: false });
		case 'UNWATCH':
			return Object.assign({}, state, { watching: false });
		case 'SHOW_MARKERS':
			return Object.assign({}, state, { showMarkers: true });
		case 'SEARCH_FRIENDS':
			return Object.assign({}, state, { searchResults: action.results });
		default:
			return state;
	}
}