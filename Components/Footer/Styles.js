import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	footer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#FC315D',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 5,
		shadowOffset: { height: -2.5 },
		position: 'relative',
	},
	tab: {
		width: '33.333333%',
		position: 'relative',
		zIndex: 2,
	},
	cover: {
		zIndex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
		width: '33.333333%',
		backgroundColor: '#fff'
	},
	icon: {
		marginTop: 1,
		height: 30, 
		width: 30,
		zIndex: 2,
	},
	marker: {
		position: 'absolute',
		left: 0,
		width: '33.33333%',
		height: StyleSheet.hairlineWidth,
		zIndex: 3
	},
	point: {
		height: 2,
		width: '70%',
		backgroundColor: '#FC315D'
	}
})