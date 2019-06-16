import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Styles from './Styles';
import BaseStyles from '../Styles';

export default class Avatar extends Component {

	shouldComponentUpdate({ image }) {
		return image !== this.props.image;
	}

	render() {
		const { image, style={} } = this.props;
		return (
			<View style={[BaseStyles.center, Styles.image, style]}>
				<Image 
					source={image ? image : require('../../../public/user.png')}
					style={[Styles.avatar, style]} />
			</View>
		);
	}
}
