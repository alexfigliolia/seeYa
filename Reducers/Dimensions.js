import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { height, width } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();
export const isX = statusBarHeight > 30;
const is5 = width <= 320;
const headerHeight = statusBarHeight + 35;
const footerHeight = isX ? 75 : 50;
const mapHeight = is5 ? 165 : 200;
const listItemWidth = width - 20;
const listItemInfoWidth = (listItemWidth * 0.9) - (60 + 30);

const initialState = {
	height, 
	width, 
	isX, 
	is5,
	statusBarHeight,
	headerHeight,
	footerHeight,
	mapHeight,
	bodyHeight: height - (headerHeight + footerHeight),
	listItemWidth,
	listItemInfoWidth,
	avoidKeyboard: headerHeight + 50,
	screen: 0,
	chatFontSize: isX ? 16 : 14,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'NAVIGATE':
			return Object.assign({}, state, { screen: action.index });
		default:
			return state;
	}
}