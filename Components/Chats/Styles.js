import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	list: {
		width: '100%',
		overflow: 'visible',
		marginTop: 5, 
		marginBottom: 5,
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
	},
	deleteIcon: {
		height: 35,
		width: 35,
	},
	deleteText: {
		fontWeight: '900',
		color: '#fff',
		fontSize: 10,
		marginTop: 5,
	},
	newChat: {
		height: 50,
		marginTop: 5, 
		marginBottom: 5,
		marginLeft: 10,
		backgroundColor: '#fff',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	row: {
		flexDirection: 'row',
	},
	add: {
		height: 25,
		width: 25,
		marginLeft: 5
	}
});