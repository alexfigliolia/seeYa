import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './Styles';
import BaseStyles from '../Styles';

export default class RevealItem extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { anim, children, colors } = this.props; 
		return (
			<TouchableOpacity style={[Styles.revealItem, {
				transform: [
					{ translateX: anim.interpolate({
						inputRange: [-80, 0],
						outputRange: [0, 80],
					})}
				]
			}]}>
				<LinearGradient 
					colors={colors}
					style={[BaseStyles.fillContainer, Styles.inner]}>
					{ children }
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}
