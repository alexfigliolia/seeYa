import React, { Component } from 'react';
import { Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../Styles';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export default class Shadow extends Component {
	constructor(props) {
	  super(props);
	  this.shadow = new Animated.Value(0);
	}

	componentDidMount() {
		this.animate();
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillUnmount() {
		this.shadow.stopAnimation();
	}

	animate() {
		Animated.sequence([
			Animated.timing(this.shadow, {
				toValue: 1,
				duration: 750,
				useNativeDriver: true,
			}),
			Animated.timing(this.shadow, {
				toValue: 0,
				duration: 0,
				useNativeDriver: true,
			})
		]).start(({ finished }) => {
			if(finished) this.animate();
		});
	}

	render() {
		return (
			<AnimatedGradient 
				colors={this.props.colors}
				style={[Styles.shadow, {
					transform: [
						{ scale: this.shadow.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 2]
						})}
					],
					opacity: this.shadow.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 0]
					})
				}]} />
		);
	}
}
