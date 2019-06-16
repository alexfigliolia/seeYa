import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Styles from './Styles';
import BaseStyles from '../Styles';
const { fillContainer, center } = BaseStyles;

let Back = null;

export default class BackButton extends Component {
	constructor(props) {
	  super(props);
		this.onPress = this.onPress.bind(this);
	}

	shouldComponentUpdate() {
		return false;
	}

	getIcon() {
		if(Back) return Back;
		return require('../../../public/back-black.png');
	}

	onPress() {
		this.props.onPress();
	}

	render() {
		const { style={} } = this.props;
		return (
			<View style={[Styles.container, style]}>
				<TouchableOpacity 
					style={[fillContainer, center]}
					onPress={this.onPress}>
					<Image
						source={this.getIcon()}
						style={Styles.icon} />
				</TouchableOpacity>
			</View>
		);
	}
}
