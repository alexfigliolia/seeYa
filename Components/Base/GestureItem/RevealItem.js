import React, { Component, Children } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './Styles';
import BaseStyles from '../Styles';
const { fillContainer, center } = BaseStyles;

export default class RevealItem extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { anim, children, colors, onPress } = this.props; 
		const clone = Children.map(children, child => React.cloneElement(child, { anim }));
		return (
			<TouchableOpacity 
				style={[Styles.revealItem, {
					transform: [
						{ translateX: anim.interpolate({
							inputRange: [-80, 0],
							outputRange: [0, 80],
						})}
					]
				}]}
				onPress={onPress}>
				<LinearGradient 
					colors={colors}
					style={[fillContainer, center, Styles.inner]}>
					{ clone }
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}
