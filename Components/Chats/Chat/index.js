import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Header from './Header';
import Messenger from './Messenger';
import Styles from './Styles';

class Chat extends Component {

	shouldComponentUpdate({ chat: { id, user, image }}) {
		const curProps = this.props;
		if(id !== curProps.chat.id) return true;
		else if(user !== curProps.chat.user) return true;
		else if(image !== curProps.chat.image) return true;
		return false;
	}

	render() {
		const { chat: { id, user, image, } } = this.props;
 		return (
			<View style={Styles.container}>
				<Header
					user={user}
					image={image} />
				<Messenger />
			</View>
		);
	}
}

const mSTP = ({ Chat }) => {
	const { conversations, activeIndex } = Chat;
	return { chat: conversations[activeIndex] };
}

export default connect(mSTP)(Chat);
