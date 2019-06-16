import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
	},
	message: {
		padding: 7.5,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 16,
		width: 'auto',
		maxWidth: '85%',
		marginTop: 5, 
		marginBottom: 5,
		minWidth: 30,
	},
	mine: {
		alignSelf: 'flex-end',
		marginRight: 10,
		backgroundColor: '#FC315D',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 2.5,
		shadowOffset: { height: 2.5 },
	},
	theirs: {
		alignSelf: 'flex-start',
		marginLeft: 10,
		backgroundColor: '#DFE4E8',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	text: {
		width: 'auto',
	}, 
	textMine: {
		color: '#fff'
	},
	textTheirs: {
		color: '#000'
	}
});