import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { openChat } from '../../../Actions/Chat';
import Avatar from '../../Base/Avatar';
import UserName from '../../Base/UserName';
import BackButton from '../../Base/BackButton';
import Styles from './Styles';
import BaseStyles from '../../Base/Styles';

class Header extends Component {
	constructor(props) {
	  super(props);
		this.goBack = this.goBack.bind(this);
	}

	shouldComponentUpdate({ user, image }) {
		const curProps = this.props;
		if(user !== curProps.user) return true;
		else if(image !== curProps.image) return true;
		return false;
	}

	goBack() {
		this.props.openChat(null);
	}

	render() {
		const { user, image } = this.props;
		return (
			<View style={[BaseStyles.center, Styles.header]}>
				<BackButton 
					style={Styles.backButton}
					onPress={this.goBack} />
				<Avatar 
					image={image}
					style={Styles.userImage} />
				<UserName 
					name={user}
					style={Styles.userNameMargin} />
			</View>
		);
	}
}

export default connect(null, { openChat })(Header);
