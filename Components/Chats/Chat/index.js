import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native';
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
		const { chat: { id, user, image, }, avoidKeyboard } = this.props;
 		return (
			<KeyboardAvoidingView 
				style={Styles.container}
				behavior='height'
				keyboardVerticalOffset={avoidKeyboard}>
				<Header
					user={user}
					image={image} />
				<Messages />
				<Input />
			</KeyboardAvoidingView>
		);
	}
}

const mSTP = ({ Chat, Dimensions }) => {
	const { conversations, activeIndex } = Chat;
	const { avoidKeyboard } = Dimensions;
	return { chat: conversations[activeIndex], avoidKeyboard };
}

export default connect(mSTP)(Chat);
