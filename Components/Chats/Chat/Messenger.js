import React, { Component } from 'react';
import { Animated, Easing, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Messages from './Messages';
import Input from './Input';
import Styles from './Styles';

class Messenger extends Component {
	constructor(props) {
	  super(props);
	  this.state = { distance: 0 };
		this.anim = new Animated.Value(0);
		this.raiseUI = this.raiseUI.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.lowerUI = this.lowerUI.bind(this);
	}

	componentDidMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', this.lowerUI);
  }

  shouldComponentUpdate(nextProps, { distance }) {
  	return distance !== this.state.distance;
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardWillShow');
    Keyboard.removeListener('keyboardWillHide');
  }

  keyboardWillShow(e) {
  	if(this.state.distance === 0) {
  		this.setState({ 
  			distance: e.endCoordinates.height - this.props.footerHeight 
  		}, this.raiseUI);
  	} else {
  		this.raiseUI();
  	}
  }

  raiseUI() {
  	Animated.timing(this.anim, {
  		toValue: 1,
  		duration: 220,
  		useNativeDriver: true,
  		easing: Easing.bezier(0.39, 0.575, 0.565, 1)
  	}).start();
  }

  lowerUI() {
  	Animated.timing(this.anim, {
  		toValue: 0,
  		duration: 200,
  		useNativeDriver: true,
  		easing: Easing.bezier(0.39, 0.575, 0.565, 1)
  	}).start();
  }

	render() {
		return (
			<Animated.View style={[Styles.container, {
				transform: [
					{ translateY: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, -this.state.distance]
					})}
				]
			}]}>
				<Messages />
				<Input />
			</Animated.View>
		);
	}
}

const mSTP = ({ Dimensions: { footerHeight }}) => {
	return { footerHeight };
}

export default connect(mSTP)(Messenger);
