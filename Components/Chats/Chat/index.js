import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import Messages from './Messages';
import Input from './Input';
import Styles from './Styles';

class Chat extends Component {

	shouldComponentUpdate({ id, user, image }) {
		const curProps = this.props;
		if(id !== curProps.id) return true;
		else if(user !== curProps.user) return true;
		else if(image !== curProps.image) return true;
		return false;
	}

	render() {
		const { chat: { id, user, image }} = this.props;
 		return (
			<View style={Styles.container}>
				<Header
					user={user}
					image={image} />
				<Messages />
				<Input />
			</View>
		);
	}
}

const mSTP = ({ Chat }) => {
	const { conversations, activeIndex } = Chat;
	return { chat: conversations[activeIndex] };
}

export default connect(mSTP)(Chat);
