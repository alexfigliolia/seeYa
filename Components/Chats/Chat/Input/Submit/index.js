import React, { Component } from 'react';
import { 
	TouchableOpacity, 
	View, 
	Animated
} from 'react-native';
import { connect } from 'react-redux';
import { 
	updateText, 
	setListening, 
	stopListening, 
	setSpeechError, 
	clearVoiceData,
	sendMessage
} from '../../../../../Actions/Chat';
import Voice from 'react-native-voice';
import Shadow from './Shadow';
import Styles from '../Styles';
import BaseStyles from '../../../../Base/Styles';
const { center, fillContainer } = BaseStyles;

let Send = null, Speak = null, Listening = null;

class Submit extends Component {
	constructor(props) {
	  super(props);
	  this.anim = new Animated.Value(0);
	  this.onPress = this.onPress.bind(this);
	  Voice.onSpeechStart = this.onSpeechStart.bind(this);
	  Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
	  Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
	  Voice.onSpeechError = this.onSpeechError.bind(this);
	  Voice.onSpeechResults = this.onSpeechResults.bind(this);
	  Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
	}

	shouldComponentUpdate({ text, listening }) {
		const curProps = this.props;
		if(text !== '' && curProps.text === '') return true;
		else if(text === '' && curProps.text !== '') return true;
		else if(listening !== curProps.listening) return true;
		return false;
	}

	async componentWillUnmount() {
		this.props.clearVoiceData();
		await Voice.destroy();
	}

	getIcon() {
		const { text, listening } = this.props;
		if(listening) {
			if(Listening) return Listening;
			return require('../../../../../public/stop.png');
		} else if(text === '') {
			if(Speak) return Speak;
			return require('../../../../../public/speak.png');
		} else {
			if(Send) return Send;
			return require('../../../../../public/send.png');
		}
	}

	async onPress() {
		const { listening, text } = this.props;
		if(listening) {
			await Voice.stop();
			this.props.stopListening();
		} else if(text !== '') {
			this.props.sendMessage(text);
		} else {
			if(await Voice.isAvailable()) {
				await Voice.start('en-US');
				this.props.setListening();
			} else {
				//Allow microphone access in settings;
			}
		}
	}

	initializeVoice() {
		Voice.onSpeechStart(this.onSpeechStart);
		Voice.onSpeechRecognized(this.onSpeechRecognized);
		Voice.onSpeechEnd(this.onSpeechEnd);
		Voice.onSpeechError(this.onSpeechError);
		Voice.onSpeechResults(this.onSpeechResults);
		Voice.onSpeechPartialResults(this.onSpeechPartialResults);
	}

	onSpeechStart() {
		this.props.setListening();
	}

	onSpeechRecognized() {
		Animated.sequence([
			Animated.timing(this.anim, {
				toValue: 1,
				duration: 50,
				useNativeDriver: true,
			}),
			Animated.timing(this.anim, {
				toValue: 0,
				duration: 50,
				useNativeDriver: true,
			})
		]).start();
	}

	onSpeechEnd() {
		this.props.stopListening();
	}

	onSpeechError({ error }) {
		this.props.setSpeechError(error);
	}

	onSpeechResults({ value }) {
		this.props.updateText(value[0]);
	}

	onSpeechPartialResults({ value }) {
		this.props.updateText(value[0]);
	}

	render() {
		const { listening } = this.props;
		const iconSize = listening ? 10 : 15;
		return (
			<View style={[Styles.submit, center]}>
				{
					listening &&
					<Shadow />
				}
				<TouchableOpacity 
					onPress={this.onPress}
					style={[fillContainer, center, Styles.raised]}>
					<Animated.Image 
						style={{
							height: iconSize,
							width: iconSize,
							transform: [
								{ scale: this.anim.interpolate({
									inputRange: [0, 1],
									outputRange: [1, 1.25]
								})}
							]
						}}
						source={this.getIcon()} />
				</TouchableOpacity>
			</View>
		);
	}
}

const mSTP = ({ Chat: { text, listening }}) => {
	return { text, listening };
}

export default connect(mSTP, { 
	updateText, 
	setListening, 
	stopListening, 
	setSpeechError, 
	clearVoiceData,
	sendMessage
})(Submit);

