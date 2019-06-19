import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1, 
		marginTop: 10,
		marginBottom: 10,
		height: 'auto',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
		borderRadius: 5,
		position: 'relative'
	},
	topSection: {
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderBottomColor: '#DDE1EF',
		borderBottomWidth: 1,
		paddingBottom: 20,
	},
	bg: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		backgroundColor: '#FC315D',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 5,
		shadowOffset: { height: 1.5 },
	},
	top: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 30,
		paddingBottom: 20,
		zIndex: 2,
	},
	front: {
		backgroundColor: '#fff',
		backfaceVisibility: 'hidden',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
	},
	back: {
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowRadius: 1.5,
		shadowOffset: { height: 1.5 },
		backfaceVisibility: 'hidden'
	},
	subText: {
		color: '#FC315D',
		fontSize: 14,
		marginTop: 5,
		fontWeight: '700',
	},
	ripple: {
		backgroundColor: 'rgba(255,255,255, 0.25)'
	},
	fill: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
		fontWeight: '300'
	},
	mapContainer: {
		flex: 1, 
		width: '100%'
	}
});