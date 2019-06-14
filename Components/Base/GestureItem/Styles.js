import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	revealItem: {
		position: 'absolute',
		top: 5,
		right: 10,
		height: 100,
		width: 70,
		backgroundColor: '#FC315D',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
		borderRadius: 5,
		zIndex: 2,
	}
});