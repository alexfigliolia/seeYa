import { StyleSheet } from 'react-native';
import { isX } from '../../../../Reducers/Dimensions';

const messageMargin = isX ? 15 : 10;
const messagePadding = isX ? 10 : 7.5

export default StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff'
	},
	messageContainer: {
		width: 'auto',
		maxWidth: '85%',
		marginTop: 5, 
		marginBottom: 5,
		borderRadius: 20,
	},
	message: {
		padding: messagePadding,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 20,
		minWidth: 30,
		width: '100%',
	},
	mine: {
		alignSelf: 'flex-end',
		marginRight: messageMargin,
		backgroundColor: '#FC315D',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 2.5,
		shadowOffset: { height: 2.5 },
	},
	theirs: {
		alignSelf: 'flex-start',
		marginLeft: messageMargin,
		backgroundColor: '#DFE4E8',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	text: {
		width: 'auto',
		fontSize: 14,
	}, 
	textMine: {
		color: '#fff',
		fontWeight: '600',

	},
	textTheirs: {
		color: '#000',
		fontWeight: '500',
	}
});