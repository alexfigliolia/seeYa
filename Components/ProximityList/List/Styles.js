import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		width: '100%'
	},
	list: {
		width: '100%',
		overflow: 'visible'
	},
	friendCenter: {
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	skeletonContainer: {
		justifyContent: 'flex-start'
	},
	skeletonBG: {
		backgroundColor: '#DEECF0'
	},
	skeletonTitle: {
		height: 16, 
		width: '100%', 
		marginBottom: 5 
	},
	skeletonSubTitle: {
		 height: 13,  
		 width: '100%'
	}
})