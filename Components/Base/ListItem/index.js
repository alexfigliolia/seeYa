import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles';
import BaseStyles from '../Styles';

class ListItem extends Component {
	constructor(props) {
	  super(props);
		this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.anim, {
			toValue: 1, 
			duration: 750, 
			delay: this.props.index * 50, 
			useNativeDriver: true,
			easing: Easing.bezier(0.075, 0.82, 0.165, 1)
		}).start();
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { listItemWidth, children } = this.props;
		return (
			<Animated.View style={[BaseStyles.center, Styles.listItem, {
				width: listItemWidth,
				opacity: this.anim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1]
				}),
				transform: [
					{ translateY: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [100, 0]
					})}
				]
			}]}>
				{ children }
			</Animated.View>
		);
	}
}

const mSTP = ({ Dimensions: { listItemWidth }}) => {
	return { listItemWidth };
}

export default connect(mSTP)(ListItem);
