import React, { Component } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../Styles';

class Circle extends Component {
	constructor(props) {
	  super(props);
		this.anim = new Animated.Value(0);
	}

	shouldComponentUpdate({ searching }) {
		return searching !== this.props.searching;
	}

	componentDidUpdate() {
		Animated.timing(this.anim, {
			toValue: this.props.searching,
			duration: 100,
			useNativeDriver: true,
		}).start();
	}

	render() {
		const { searching, dims, xWidth } = this.props;
		return (
			<Animated.View style={[Styles.circle, {
				height: dims,
				width: dims,
				borderWidth: searching ? 0 : dims/10,
				backgroundColor: searching ? '#FC315D' : '#fff',
				transform: [
					{ translateY: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [-dims/4, -xWidth*0.75]
					})},
					{ translateX: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, dims*0.2]
					})},
					{ scale: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 1.3]
					})}
				]
			}]} />
		);
	}
}

const mSTP = ({ Header: { searching }}) => {
	return { searching };
}

export default connect(mSTP)(Circle);
