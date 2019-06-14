import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles';
import BaseStyles from '../Base/Styles';

class Marker extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { anim, pos2, pos3, isX } = this.props;
		return (
			<Animated.View style={[BaseStyles.center, Styles.marker, {
				bottom: isX ? 20 : 2,
				transform: [
					{ translateX: anim.interpolate({
						inputRange: [0, 1, 2],
						outputRange: [0, pos2, pos3]
					})}
				],
			}]}>
				<View style={Styles.point} />
			</Animated.View>
		);
	}
}

const mSTP = ({ Dimensions: { isX }}) => {
	return { isX };
}

export default connect(mSTP)(Marker);
