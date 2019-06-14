import React, { Component } from 'react';
import { Animated } from 'react-native';
import Styles from './Styles';
import BaseStyles from '../Base/Styles';

export default class Cover extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { anim, pos2, pos3 } = this.props;
		return (
			<Animated.View style={[BaseStyles.fillContainer, Styles.cover, {
				transform: [
					{ translateX: anim.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [0, pos2, pos3]
					})}
				]
			}]} />
		);
	}
}
