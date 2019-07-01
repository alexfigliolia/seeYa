import React, { Component } from 'react';
import { Animated, Easing, View, Text } from 'react-native';
import { connect, } from 'react-redux';
import { openChat, deleteChat } from '../../../Actions/Chat';
import GestureItem from '../../Base/GestureItem';
import Avatar from '../../Base/Avatar';
import UserName from '../../Base/UserName';
import Distance from '../../Base/Distance';
import Delete from './Delete';
import ListItemStyles from '../../Base/ListItem/Styles';
import Styles from '../Styles';

class Conversation extends Component {
	constructor(props) {
	  super(props);
	  this.mounts = 0;
	  this.anim = new Animated.Value(0);
	  this.openChat = this.openChat.bind(this);
	  this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		Animated.timing(this.anim, {
			toValue: 1, 
			duration: this.mounts ? 300 : 0
		}).start(() => (this.mounts++));
	}

	shouldComponentUpdate({ index, user, image, id }) {
		const curProps = this.props;
		if(index !== curProps.index) return true;
		else if(user !== curProps.user) return true;
		else if(image !== curProps.image) return true;
		else if(id !== curProps.id) return true;
		return false;
	}

	openChat() {
		const { openChat, index } = this.props;
		openChat(index);
	}

	delete() {
		const { deleteChat, id } = this.props;
		Animated.timing(this.anim, {
			toValue: 0, 
			duration: 300
		}).start(() => deleteChat(id));
	}

	render() {
		const { index, user, image, listItemInfoWidth } = this.props; 
		return (
			<GestureItem 
				index={index}
				onPress={this.openChat}
				revealItem={<Delete />}
				revealItemPress={this.delete}
				style={{
					height: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 110]
					}),
					opacity: this.anim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1]
					})
				}}>
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

export default connect(mSTP, { openChat, deleteChat })(Conversation);
