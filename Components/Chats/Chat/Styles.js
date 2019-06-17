import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	header: {
		width: '100%',
		height: 50,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 2.5,
		shadowOffset: { height: 2.5 },
		flexDirection: 'row',
		zIndex: 2,
		position: 'relative'
	},
	userImage: {
		height: 30, 
		width: 30, 
		borderRadius: 15,
	},
	userNameMargin: {
		marginLeft: 15
	},
	backButton: {
		position: 'absolute',
		top: 0,
		left: 0
	}
});