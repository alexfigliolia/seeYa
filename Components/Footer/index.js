import React, { Component } from 'react';
import { Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Tab from './Tab';
import Cover from './Cover';
import Marker from './Marker';
import User from '../../public/user-white.png';
import UserPink from '../../public/user-pink.png';
import Location from '../../public/location-white.png';
import LocationPink from '../../public/location-pink.png';
import Chat from '../../public/chat-white.png';
import ChatPink from '../../public/chat-pink.png';
import Styles from './Styles';
import BaseStyles from '../Base/Styles';

class Footer extends Component {
	constructor(props) {
	  super(props);
	  const { width } = this.props;
	  this.pos2 = width/3;
	  this.pos3 = this.pos2 * 2;
	  this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		this.switch(this.props.screen);
	}

	shouldComponentUpdate() {
		return false;
	}

	UNSAFE_componentWillReceiveProps({ screen }) {
		if(screen !== this.props.screen) {
			this.switch(screen);
		}
	}

	switch(screen) {
		Animated.spring(this.anim, {
			toValue: screen,
			bounciness: 10,
			useNativeDriver: true
		}).start();
	}

	render() {
		const { footerHeight, gradientColors } = this.props;
		return (
			<LinearGradient 
				style={[Styles.footer, BaseStyles.center, { 
					height: footerHeight,
				}]}
				colors={gradientColors}>
				<Marker 
					anim={this.anim}
					pos2={this.pos2}
					pos3={this.pos3} />
				<Cover 
					anim={this.anim}
					pos2={this.pos2}
					pos3={this.pos3} />
				<Tab
					index={0} 
					image={Location}
					activeImage={LocationPink} />
				<Tab
					index={1} 
					image={Chat}
					activeImage={ChatPink} />
				<Tab
					index={2} 
					image={User}
					activeImage={UserPink} />
			</LinearGradient>
		);
	}
}

const mSTP = ({ Dimensions: { footerHeight, width, screen, gradientColors }}) => {
	return { footerHeight, width, screen, gradientColors };
}

export default connect(mSTP)(Footer);
