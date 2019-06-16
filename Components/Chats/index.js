import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Conversations from './Conversations';
import Chat from './Chat';
import Styles from './Styles';
import BaseStyles from '../Base/Styles';

class Chats extends Component {

  shouldComponentUpdate({ activeIndex }) {
  	return activeIndex !== this.props.activeIndex;
  }

	render() {
		const { activeIndex } = this.props;
		return (
			<View style={[
				BaseStyles.container, 
				!activeIndex && Styles.container, 
				{ height: this.props.height }
			]}>
				{
					activeIndex !== null ? 
						<Chat />
					: <Conversations />
				}
			</View>
		);
	}
}

const mSTP = ({ Dimensions, Chat }) => {
	const { bodyHeight } = Dimensions;
	const { activeIndex } = Chat;
	return { height: bodyHeight, activeIndex };
}

export default connect(mSTP)(Chats);

