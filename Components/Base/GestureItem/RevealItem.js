import React, { Component } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Styles from './Styles';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

class RevealItem extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { anim, children, gradientColors } = this.props; 
		return (
			<AnimatedGradient style={[Styles.revealItem, {
				transform: [
					{ translateX: anim.interpolate({
						inputRange: [-80, 0],
						outputRange: [0, 80],
					})}
				]
			}]}
			colors={gradientColors}>
				<TouchableOpacity>
					{ children }
				</TouchableOpacity>
			</AnimatedGradient>
		);
	}
}

const mSTP = ({ Dimensions: { gradientColors }}) => {
	return { gradientColors };
}

export default connect(mSTP)(RevealItem);
