import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ProfileImage from './ProfileImage';
import UserName from '../Base/UserName';
import MapView from '../Base/MapView';
import Stats from './Stats';
import Styles from './Styles';

class Profile extends Component {
	constructor(props) {
	  super(props);
		this.bgHeight = 30 + (this.props.width*0.45/2);
		this.fontSize = this.props.width*0.075;
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
			gradientColors,
		} = this.props;
		return (
			<View style={{ minHeight: height, width: '100%', alignItems: 'center' }}>
				<View style={[Styles.container, { minHeight: height - 20, width }]}>
					<View style={Styles.topSection}>
						<LinearGradient 
							style={[Styles.bg, { height: this.bgHeight }]}
							colors={gradientColors} />
						<View style={Styles.top}>
							<ProfileImage />
						</View>
						<UserName 
							style={{ fontSize: this.fontSize }}
							name={username} />
					</View>
					<Stats />
					<View style={Styles.mapContainer}>
						<MapView />
					</View>
				</View>
			</View>
		);
	}
}

const mSTP = ({ Dimensions, User }) => {
	const { bodyHeight, listItemWidth, gradientColors } = Dimensions;
	const { username, email } = User;
	return { 
		height: bodyHeight, 
		width: listItemWidth, 
		gradientColors,
		username, 
		email, 
	};
}

export default connect(mSTP)(Profile);
