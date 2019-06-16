import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Styles from './Styles';

class Message extends Component {

	shouldComponentUpdate({ index, length, text, user }) {
		const curProps = this.props;
		if(index !== curProps.index) return true;	
		else if(length !== curProps.length) return true;
		else if(text !== curProps.text) return true;
		else if(user !== curProps.user) return true;
		return false;
	}

	render() {
		const { index, length, text, user, username } = this.props;
		return (
			<View style={[
				Styles.message, 
				user === username ? 
					Styles.mine 
				: Styles.theirs,
				{
					marginBottom: index === 0 ? 10 : 5,
					marginTop: index === length - 1 ? 10 : 5
				}
			]}>
				<Text style={[
					Styles.text, 
					user === username ?
						Styles.textMine
					: Styles.textTheirs
				]}>{text}</Text>
			</View>
		);
	}
}

const mSTP = ({ User: { username }}) => {
	return { username };
}

export default connect(mSTP)(Message);
