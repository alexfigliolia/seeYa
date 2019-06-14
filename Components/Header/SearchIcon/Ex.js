import React, { Component } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../Styles';

class Ex extends Component {
	constructor(props) {
	  super(props);
		this.anim = new Animated.Value(0);
	}

	shouldComponentUpdate() {
		return false;
	}

	UNSAFE_componentWillReceiveProps({ searching }) {
		if(searching !== this.props.searching) {
			Animated.spring(this.anim, {
				toValue: searching,
				bounciness: searching ? 20 : 5,
				useNativeDriver: true,
			}).start();
		}
	}

	render() {
		const { height, width, borderRadius, dims, searching } = this.props;
		return (
			<Animated.View style={[Styles.stick, {
				height: height,
				width: width,
				borderRadius: borderRadius,
				backgroundColor: '#fff',
				opacity: this.anim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1]
				}),
				transform: [
					{ translateX: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [-height, width*1.65]
					})},
					{ translateY: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [dims/5, -borderRadius*1.4]
					})},
					{ rotate: '45deg' },
					{ scaleY: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 1.5]
					})}
				]
			}]} />
		);
	}
}

const mSTP = ({ Header: { searching }}) => {
	return { searching };
}

export default connect(mSTP)(Ex);