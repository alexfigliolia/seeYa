import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	image: {
		height: 60,
		width: 60,
		borderRadius: 30,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	avatar: {
		height: 60,
		width: 60,
		borderRadius: 30,
		resizeMode: 'cover'
	},
});