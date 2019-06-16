import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		minHeight: 40,
		backgroundColor: '#fff',
		flexDirection: 'row',
		position: 'relative',
		marginBottom: 5,
		borderColor: '#E6EEEE',
		borderWidth: 2,
		borderRadius: 20,
	},
	textInput: {
		flex: 1,
		height: 'auto',
		maxHeight: 200,
		paddingLeft: 10,
	  paddingRight: 10,
	  paddingTop: 10,
	  paddingBottom: 10,
		fontWeight: '600',
	  color: '#434448',
	},
	submit: {
		height: 30,
		width: 30,
		borderRadius: 17.5,
		backgroundColor: '#FC315D',
		alignSelf: 'flex-end',
		marginRight: 6.5,
		marginBottom: 4
	},
	raised: { 
		zIndex: 2 
	},
	submitIcon: {
		height: 20, 
		width: 20
	},
	shadow: {
		position: 'absolute',
		top: 0,
		right: 0,
		height: 30,
		width: 30,
		borderRadius: 15,
		backgroundColor: '#FC315D'
	},
});


