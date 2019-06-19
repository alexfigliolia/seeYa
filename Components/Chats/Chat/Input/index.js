import React, { Component } from 'react';
import { View, TextInput, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { updateText } from '../../../../Actions/Chat';
import Submit from './Submit/index.js';
import Styles from './Styles';
import BaseStyles from '../../../Base/Styles';

class Input extends Component {
	constructor(props) {
	  super(props);
		this.customLinear = {
      duration: 100,
      create: { 
        type: 'linear', 
        property: LayoutAnimation.Properties.scaleY 
      },
      update: { type: 'linear' },
    }
    const { width, isX } = this.props;
    const offset = isX ? 30 : 20;
		this.inputWidth = width - offset;
		this.onChange = this.onChange.bind(this);
	}

	UNSAFE_componentWillUpdate() {
		LayoutAnimation.configureNext(this.customLinear);
	}

	shouldComponentUpdate({ text }) {
		return text !== this.props.text;
	}

	onChange(text) {
		this.props.updateText(text);
	}

	render() {
		const { text, chatFontSize } = this.props;
		return (
			<View style={[
				Styles.container, 
				BaseStyles.center, 
				{ width: this.inputWidth }
			]}>
				<TextInput
					ref={c => this.input = c}
	        style={[Styles.textInput, { fontSize: chatFontSize }]}
	        placeholder='Message:'
	        placeholderTextColor='#7C7F8A'
	        autoCorrect={false}
	        autoCompleteType='name'
	        textContentType='name'
	        multiline={true}
	        numberOfLines={5}
	        value={text}
	        onChangeText={this.onChange} />
	      <Submit />
			</View>
		);
	}
}

const mSTP = ({ Chat, Dimensions }) => {
	const { text } = Chat;
	const { isX, width, chatFontSize } = Dimensions;
	return { text, width, chatFontSize };
}

export default connect(mSTP, { updateText })(Input);
