import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Styles from './Styles';

export default class RevealItem extends Component {
	render() {
		const { anim, children, style={} } = this.props; 
		return (
			<TouchableOpacity
				style={[Styles.revealItem, style, {
					transform: [
						{ translateX: anim.interpolate({
							inputRange: [-80, 0],
							outputRange: [0, 80],
						})}
					]
				}]}>
				{ children }
			</TouchableOpacity>
		);
	}
}
