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
		this.flipToUpload = this.flipToUpload.bind(this);
		this.flipBack = this.flipBack.bind(this);
		this.initTimer = this.initTimer.bind(this);
		this.clearTimer = this.clearTimer.bind(this);
	}

	shouldComponentUpdate(np, { flipped }) {
		return flipped !== this.state.flipped;
	}

	flipBack() {
		this.setState(ps => {
			Animated.timing(this.anim, {
				toValue: 0,
				duration: 350,
				useNativeDriver: true
			}).start();
			return { flipped: false };
		});
	}

	flipToUpload() {
		this.setState(ps => {
			Animated.timing(this.anim, {
				toValue: 1,
				duration: 350,
				useNativeDriver: true
			}).start(this.initTimer);
			return { flipped: true };
		});
	}

	initTimer() {
		this.timer = setTimeout(this.flipBack, 2000);
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
					flip={this.flipToUpload} />
				<Back 
					anim={this.anim}
					dims={this.dims}
					borderRadius={this.borderRadius}
					visible={this.state.flipped}
					flip={this.flipBack}
					clearTimer={this.clearTimer} />
			</View>
		);
	}
}

const mSTP = ({ Dimensions: { listItemWidth }}) => {
	return { listItemWidth };
}

export default connect(mSTP)(ProfileImage);
