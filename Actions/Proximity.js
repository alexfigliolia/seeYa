export const getLocation = () => {
	return dispatch => {
		navigator.geolocation.getCurrentPosition(({ coords, timestamp }) => {
	    const { latitude, longitude } = coords;
	    dispatch({ type: 'SET_LAT_LONG', latitude, longitude, watching: false });
	    dispatch(updateDistances(latitude, longitude));
	    dispatch(watchLocation());
	  }, ({ message }) => {
	  	dispatch({ type: 'SET_ERROR', message });
	  }, { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 });
	}
}

let watchID = null;

export const watchLocation = () => {
	return dispatch => {
		watchID = navigator.geolocation.watchPosition(({ coords, timestamp }) => {
			const { latitude, longitude } = coords;
	    dispatch({ type: 'SET_LAT_LONG', latitude, longitude, watching: true });
	    dispatch(updateDistances(latitude, longitude));
	  }, ({ message }) => {
	  	dispatch({ type: 'SET_ERROR', message });
	  }, { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 });
	}
}

export const clearWatch = () => {
	navigator.geolocation.clearWatch(watchID);
	return { type: 'UNWATCH' };
}

const calculateDistance = (myLat, myLong, latitude, longitude) => {
	if(!myLat || !myLong || !latitude || !longitude) return 0;
  const R = 6371e3; // earth radius in meters
  const latCoord1 = myLat * (Math.PI / 180);
  const latCoord2 = latitude * (Math.PI / 180);
  const latDiff = (latitude - myLat) * (Math.PI / 180);
  const longDiff = (longitude - myLong) * (Math.PI / 180);
  const a = (Math.sin(latDiff / 2) * Math.sin(latDiff / 2)) +
            ((Math.cos(latCoord1) * Math.cos(latCoord2)) * (Math.sin(longDiff / 2) * Math.sin(longDiff / 2)));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c) * 3.2808;
}

const friends = [{
	name: 'George Figliolia',
	image: null,
	distance: null,
	latitude: 39.35760,
	longitude: -121.882148,
}, {
	name: 'Dana Figliolia',
	image: null,
	distance: null,
	latitude: 37.35761,
	longitude: -121.882270,
}, {
	name: 'Steve Figliolia',
	image: null,
	distance: null,
	latitude: 37.35760,
	longitude: -121.882153,
}, {
	name: 'Erica Figliolia',
	image: null,
	distance: null,
	latitude: 37.35759,
	longitude: -122.882148,
}, {
	name: 'Vincent Figliolia',
	image: null,
	distance: null,
	latitude: 37.35760,
	longitude: -121.882153,
}, {
	name: 'Ronald Figliolia',
	image: null,
	distance: null,
	latitude: 37.35759,
	longitude: -122.882148,
}];

export const getFriends = () => {
	return (dispatch, getState) => {
		const { latitude: myLat, longitude: myLong } = getState().Proximity;
		for(let i = 0; i < friends.length; i++) {
			const { latitude, longitude } = friends[i];
			friends[i].distance = calculateDistance(myLat, myLong, latitude, longitude);
		}
		dispatch({ type: 'GET_FRIENDS', friends: friends.sort((a, b) => a.distance - b.distance) });
	}
}

export const updateDistances = (myLat, myLong) => {
	return (dispatch, getState) => {
		const { friends } = getState().Proximity;
		for(let i = 0; i < friends.length; i++) {
			const { latitude, longitude } = friends[i];
			friends[i].distance = calculateDistance(myLat, myLong, latitude, longitude);
		}
		dispatch({ type: 'GET_FRIENDS', friends: friends.sort((a, b) => a.distance - b.distance) });
	}
}

export const showMarkers = () => {
	return { type: 'SHOW_MARKERS' };
}