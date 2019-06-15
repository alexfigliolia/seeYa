import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	relative: {
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 5,
	},
	raised: {
		zIndex: 2
	},
	ripple: {
		zIndex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.03)'
	}
});