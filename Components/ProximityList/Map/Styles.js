import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	map: {
		width: '100%',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 5,
		shadowOffset: { height: 2.5 },
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		justifyContent: 'flex-end',
		zIndex: 2,
	},
	mapWrapper: {
		width: '100%',
		backgroundColor: '#F3F8F8',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		overflow: 'hidden',
		zIndex: 2,
	},
	mapTab: {
		width: '100%',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		justifyContent: 'flex-end',
		zIndex: 3,
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	arrow: {
		height: 35, 
		width: 35
	},
	marker: { 
		height: 40, 
		width: 40, 
		borderRadius: 20,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	markerImage: {
		height: 40, 
		width: 40, 
		borderRadius: 20,
	}
});