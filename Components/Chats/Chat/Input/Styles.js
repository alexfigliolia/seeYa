import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		minHeight: 30,
		backgroundColor: '#fff',
		flexDirection: 'row',
		position: 'relative'
	},
	textInput: {
		flex: 1,
		height: 'auto',
		maxHeight: 200,
		paddingLeft: 10,
	  paddingRight: 35,
	  paddingTop: 7.5,
	  paddingBottom: 7.5,
	  fontSize: 14,
		borderRadius: 15,
		backgroundColor: '#E6EEEE',
		fontWeight: '600',
	  color: '#434448',
	},
	submit: {
		height: 25,
		width: 25,
		borderRadius: 12.5,
		backgroundColor: '#FC315D',
		position: 'absolute',
		bottom: 3.5,
		right: 5
	},
	raised: { 
		zIndex: 2 
	},
	submitIcon: {
		height: 15, 
		width: 15
	},
	shadow: {
		position: 'absolute',
		top: 0,
		right: 0,
		height: 25,
		width: 25,
		borderRadius: 12.5,
		backgroundColor: '#FC315D'
	},
});


