import React, { Component } from 'react';
import { Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import Styles from '../Styles';

class FriendMarker extends Component {
	constructor(props) {
	  super(props);
		this.animator = new Animated.Value(0);
	}

	componentDidMount() {
		if(this.props.show) this.show();
	}

	UNSAFE_componentWillReceiveProps({ show }) {
		if(show !== this.props.show && show) this.show();
	}

	shouldComponentUpdate({ image }) {
		return typeof image === 'object' && typeof this.props.image !== 'object';
	}

	show() {
		Animated.spring(this.animator, {
			toValue: 1, 
			duration: 1000, 
			delay: this.props.index * 100, 
			useNativeDriver: true
		}).start();
	}

	render() {
		return (
			<Animated.View style={[Styles.marker, {
				transform: [{ rotate: this.animator.interpolate({
					inputRange: [0, 1],
					outputRange: ['180deg', '0deg']
				}) }],
				opacity: this.animator.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1]
				})
			}]}>
	      <Image 
	        source={this.props.image} 
	        style={Styles.markerImage} />
	    </Animated.View>
		);
	}
}

const mSTP = ({ Proximity: { showMarkers }}) => {
	return { show: showMarkers };
}

export default connect(mSTP)(FriendMarker);