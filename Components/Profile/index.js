import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class Profile extends Component {
	render() {
		return (
			<View style={{ height: this.props.bodyHeight }}></View>
		);
	}
}

const mSTP = ({ Dimensions: { bodyHeight }}) => {
	return { bodyHeight };
}

export default connect(mSTP)(Profile);
