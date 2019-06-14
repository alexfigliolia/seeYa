import React, { Component } from 'react';
import { Text } from 'react-native';
import Styles from './Styles';

export default class UserName extends Component {

	shouldComponentUpdate({ name }) {
		return name !== this.props.name;
	}

	render() {
		return (
			<Text style={Styles.name}>{this.props.name}</Text>
		);
	}
}
