import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import Styles from './Styles';

export default class Ripple extends Component {
	constructor(props) {
	  super(props);
		this.scale = new Animated.Value(0);
		this.opacity = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.parallel([
			Animated.timing(this.scale, {
				toValue: 1, 
				duration: 750,
				useNativeDriver: true,
				easing: Easing.bezier(0.25, 0.46, 0.45, 0.94)
			}),
			Animated.timing(this.opacity, {
				toValue: 1, 
				duration: 500,
				delay: 475,
				useNativeDriver: true
			})
		]).start(() => {
			const { length, index, clear } = this.props;
			if(index === length - 1) clear();
		});
	}

	render() {
		const { width, top, left, timeStamp, circumference, radius } = this.props;
		return (
			<Animated.View 
				pointerEvents='none'
				style={[Styles.ripple, {
					height: circumference,
					width: circumference,
					borderRadius: radius,
					top,
					left,
					transform: [
						{ scale: this.scale.interpolate({
							inputRange: [0, 1],
							outputRange: [0, 1]
						})}
					],
					opacity: this.opacity.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 0]
					})
				}]}/>
		);
	}
}
