import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	header: {
		width: '100%',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
		zIndex: 5,
	},
	center: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logo: {
		fontWeight: '700',
		color: '#FC315D',
		marginLeft: 13.75,
		textShadowColor: 'rgba(0,0,0,0.15)',
		textShadowRadius: 1.5,
		textShadowOffset: { height: 1.5 },
	},
	searchContainer: {
		height: '100%',
		backgroundColor: '#fff',
		alignSelf: 'flex-end',
		zIndex: 6,
	},
	searchIconButton: {
		marginRight: 21,
	},
	circle: {
		height: 40,
		width: 40,
		borderRadius: 20,
		borderColor: '#FC315D',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	stick: {
		backgroundColor: '#FC315D',
		position: 'absolute',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	searchBar: {
		width: '100%',
		position: 'absolute',
		bottom: 0, left: 0,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	textInput: {
		height: '85%',
		width: '92.5%',
		paddingLeft: 10,
		borderRadius: 50,
		backgroundColor: '#E6EEEE',
		fontWeight: '600',
	  color: '#434448'
	}
});