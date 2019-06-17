import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ProfileImage from './ProfileImage';
import UserName from '../Base/UserName';
import Styles from './Styles';

class Profile extends Component {
	constructor(props) {
	  super(props);
		this.bgHeight = 30 + (this.props.width*0.45/2);
	}

	shouldComponentUpdate({ username, email }) {
		const curProps = this.props;
		if(username !== curProps.username) return true;
		else if(email !== curProps.email) return true;
		return false;
	}

	render() {
		const { 
			height, 
			width, 
			username, 
			email,
		} = this.props;
		return (
			<View style={{ minHeight: height, width: '100%', alignItems: 'center' }}>
				<View style={[Styles.container, { minHeight: height - 20, width }]}>
					<View style={[Styles.bg, { height: this.bgHeight }]} />
					<View style={Styles.top}>
						<ProfileImage />
					</View>
					<UserName 
						style={{ fontSize: 18 }}
						name={username} />
				</View>
			</View>
		);
	}
}

const mSTP = ({ Dimensions, User }) => {
	const { bodyHeight, listItemWidth } = Dimensions;
	const { username, email } = User;
	return { 
		height: bodyHeight, 
		width: listItemWidth, 
		username, 
		email, 
	};
}

export default connect(mSTP)(Profile);
