import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Styles from './Styles';

class Message extends Component {
	constructor(props) {
	  super(props);
		this.shadow = {
			shadowColor: '#000',
			shadowOpacity: 0.15,
			shadowRadius: 2.5,
			shadowOffset: { height: 2.5 },
		};
	}

	shouldComponentUpdate({ index, length, text, user }) {
		const curProps = this.props;
		if(index !== curProps.index) return true;	
		else if(length !== curProps.length) return true;
		else if(text !== curProps.text) return true;
		else if(user !== curProps.user) return true;
		return false;
	}

	render() {
		const { 
			index, 
			length, 
			text, 
			user, 
			username, 
			chatFontSize,
			gradientColors
		} = this.props;
		const mine = user === username;
		return (
			<View style={[
				Styles.messageContainer, 
				user === username ? 
					Styles.mine 
				: Styles.theirs,
				{
					marginBottom: index === 0 ? 15 : 5,
					marginTop: index === length - 1 ? 10 : 5
				},
			]}>
				<LinearGradient 
					style={[Styles.message,
					]}
					colors={mine ? gradientColors : ['#E8EDF1', '#DFE4E8']}>
					<Text style={[
						Styles.text, 
						{ fontSize: chatFontSize },
						user === username ?
							Styles.textMine
						: Styles.textTheirs
					]}>{text}</Text>
				</LinearGradient>
			</View>
		);
	}
}

const mSTP = ({ User, Dimensions }) => {
	const { username } = User;
	const { chatFontSize, gradientColors } = Dimensions;
	return { username, chatFontSize, gradientColors };
}

export default connect(mSTP)(Message);
