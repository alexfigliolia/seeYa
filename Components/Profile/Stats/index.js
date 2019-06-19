import React, { Component } from 'react';
import { View } from 'react-native';
import Stat from './Stat';
import Styles from './Styles';

export default class Stats extends Component {

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<View style={Styles.stats}>
				<Stat
					index={0}
					propString='Friends' />
				<Stat
					index={1}
					propString='Followers' />
				<Stat
					index={2}
					propString='Following' />
			</View>
		);
	}
}
