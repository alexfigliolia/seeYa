import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		marginTop: 5, 
		marginBottom: 5
	},
	list: {
		width: '100%',
		overflow: 'visible'
	},
	conversationCenter: {
		width: '90%',
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	lastMessage: {
		textAlign: 'left',
		color: '#898B9A',
		fontSize: 13,
		fontWeight: '600',
	},
	distanceSpacing: {
		marginTop: 5, 
		marginBottom: 5
	}
});