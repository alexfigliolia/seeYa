import React, { Component } from 'react';
import { Animated, View, Image } from 'react-native';
import { connect } from 'react-redux';
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
	  this.setActive = this.setActive.bind(this);
	}

	setActive(index) {
		this.setState({ active: index });
	}

	shouldComponentUpdate() {
		return false;
	}

	UNSAFE_componentWillReceiveProps({ screen }) {
		if(screen !== this.props.screen) {
			Animated.spring(this.anim, {
				toValue: screen,
				bounciness: 10,
				useNativeDriver: true
			}).start();
		}
	}

	render() {
		return (
			<View style={[Styles.footer, BaseStyles.center, { 
				height: this.props.footerHeight,
			}]}>
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
			</View>
		);
	}
}

const mSTP = ({ Dimensions: { footerHeight, width, screen }}) => {
	return { footerHeight, width, screen };
}

export default connect(mSTP)(Footer);
