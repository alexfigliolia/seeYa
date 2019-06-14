import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Location from '../../../public/location.png';
import Styles from './Styles';
import UserNameStyles from '../UserName/Styles';

export default class Distance extends Component {
	constructor(props) {
	  super(props);
	  this.formatDistance = this.formatDistance.bind(this);
	}

	shouldComponentUpdate({ distance }) {
		return distance !== this.props.distance;
	}

	formatDistance(distance) {
		//528 = 0.1 miles
		return distance >= 528 ? `${(distance/5280).toFixed(1)} miles` : `${Math.round(distance)} feet`;
	}

	render() {
		const { distance, style={} } = this.props;
		return (
			<View style={[Styles.location, style]}>
				<Image 
					source={Location}
					style={Styles.marker} />
				<Text style={[UserNameStyles.name, Styles.userLocation]}>{this.formatDistance(distance)}</Text>
			</View>
		);
	}
}
