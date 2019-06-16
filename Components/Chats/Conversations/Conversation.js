import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect, } from 'react-redux';
import { openChat } from '../../../Actions/Chat';
import GestureItem from '../../Base/GestureItem';
import Avatar from '../../Base/Avatar';
import UserName from '../../Base/UserName';
import Distance from '../../Base/Distance';
import ListItemStyles from '../../Base/ListItem/Styles';
import Styles from '../Styles';

class Conversation extends Component {
	constructor(props) {
	  super(props);
	  this.openChat = this.openChat.bind(this);
	}

	shouldComponentUpdate({ index, user, image }) {
		const curProps = this.props;
		if(index !== curProps.index) return true;
		else if(user !== curProps.user) return true;
		else if(image !== curProps.image) return true;
		return false;
	}

	openChat() {
		const { openChat, index } = this.props;
		openChat(index);
	}

	render() {
		const { index, user, image, listItemInfoWidth } = this.props; 
		return (
			<GestureItem 
				index={index}
				onPress={this.openChat}>
				<View style={Styles.conversationCenter}>
					<Avatar image={image} />
					<View style={[ListItemStyles.infoMargin, { width: listItemInfoWidth }]}>
						<UserName name={user} />
						<Distance
							style={Styles.distanceSpacing} 
							distance={5} />
						<Text 
							style={Styles.lastMessage}
							numberOfLines={2}>Hey I tried to call you</Text>
					</View>
				</View>
			</GestureItem>
		);
	}
}

const mSTP = ({ Dimensions: { listItemInfoWidth }}) => {
	return { listItemInfoWidth }
}

export default connect(mSTP, { openChat })(Conversation);
