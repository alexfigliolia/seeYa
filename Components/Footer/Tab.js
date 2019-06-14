import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { navigate } from '../../Actions/Dimensions';
import Styles from './Styles';
import BaseStyles from '../Base/Styles';
const { fillContainer, center } = BaseStyles;

class Tab extends Component {
	constructor(props) {
	  super(props);
		this.setActive = this.setActive.bind(this);
		this.margin = this.props.footerHeight === 75 ? 20 : 0;
	}

	shouldComponentUpdate({ screen }) {
		return screen !== this.props.screen;
	}

	setActive() {
		const { navigate, index } = this.props;
		navigate(index);
	}

	render() {
		const { image, activeImage, screen, index } = this.props; 
		return (
			<TouchableWithoutFeedback onPress={this.setActive}>
				<View style={[fillContainer, center, Styles.tab, {
					borderRightWidth: index < 2 ? StyleSheet.hairlineWidth : 0,
					borderRightColor: index < 2 ? '#fff' : 'transparent',
				}]}>
					<Image 
						style={[Styles.icon, {
							marginBottom: this.margin
						}]}
						source={screen === index ? activeImage : image} />
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mSTP = ({ Dimensions: { screen, footerHeight }}) => {
	return { screen, footerHeight };
}

export default connect(mSTP, { navigate })(Tab);
