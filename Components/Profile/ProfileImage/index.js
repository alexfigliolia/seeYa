import React, { Component } from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Front from './Front';
import Back from './Back';
import Styles from '../Styles';

class ProfileImage extends Component {
	constructor(props) {
	  super(props);
	  this.state = { flipped: false };
		this.anim = new Animated.Value(0);
	  this.dims = this.props.listItemWidth*0.45;
		this.borderRadius = this.dims/2;
		this.timer = null;
		this.flip = this.flip.bind(this);
		this.clearTimer = this.clearTimer.bind(this);
	}

	shouldComponentUpdate(np, { flipped }) {
		return flipped !== this.state.flipped;
	}

	flip() {
		this.setState(({ flipped }) => {
			Animated.timing(this.anim, {
				toValue: flipped ? 0 : 1,
				duration: 350,
				useNativeDriver: true
			}).start(() => !flipped && this.initTimer());
			return { flipped: !flipped };
		});
	}

	initTimer() {
		this.timer = setTimeout(this.flip, 2000);
	}

	clearTimer() {
		clearTimeout(this.timer);
		this.timer = null;
	}

	render() {
		const { flipped } = this.state;
		return (
			<View style={Styles.flipContainer}>
				<Front 
					anim={this.anim}
					dims={this.dims}
					borderRadius={this.borderRadius}
					visible={!this.state.flipped}
					flip={this.flip} />
				<Back 
					anim={this.anim}
					dims={this.dims}
					borderRadius={this.borderRadius}
					visible={this.state.flipped}
					flip={this.flip}
					clearTimer={this.clearTimer} />
			</View>
		);
	}
}

const mSTP = ({ Dimensions: { listItemWidth }}) => {
	return { listItemWidth };
}

export default connect(mSTP)(ProfileImage);
