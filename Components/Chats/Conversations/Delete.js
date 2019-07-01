import React, { Component } from 'react';
import { Animated, Image, Text } from 'react-native';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';

let Trash;

export default class Delete extends Component {

	getIcon() {
		if(Trash) return Trash;
		Trash = require('../../../public/trash.png');
		return Trash;
	}

	render() {
		return (
			<Animated.View style={[BaseStyles.center, {
				transform: [
					{ scale: this.props.anim.interpolate({
						inputRange: [-80, 0],
						outputRange: [1, 0]
					})}
				]
			}]}>
				<Image 
					source={this.getIcon()}
					style={Styles.deleteIcon} />
				<Text style={Styles.deleteText}>DELETE</Text>
			</Animated.View>
		);
	}
}
