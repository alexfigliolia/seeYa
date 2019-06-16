import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Styles from './Styles';
import BaseStyles from '../Styles';

let Profile = null;

export default class Avatar extends Component {

	shouldComponentUpdate({ image }) {
		return image !== this.props.image;
	}

	getIcon() {
		if(Profile) return Profile;
		Profile = require('../../../public/user.png');
		return Profile;
	}

	render() {
		const { image, style={} } = this.props;
		return (
			<View style={[BaseStyles.center, Styles.image, style]}>
				<Image 
					source={image ? image : this.getIcon()}
					style={[Styles.avatar, style]} />
			</View>
		);
	}
}
