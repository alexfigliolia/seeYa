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
		return (
			<View style={[Styles.container, BaseStyles.center]}>
				<TextInput
					ref={c => this.input = c}
	        style={[Styles.textInput]}
	        placeholder='Message:'
	        placeholderTextColor='#7C7F8A'
	        autoCorrect={false}
	        autoCompleteType='name'
	        textContentType='name'
	        multiline={true}
	        numberOfLines={5}
	        value={this.props.text}
	        onChangeText={this.onChange} />
	      <Submit />
			</View>
		);
	}
}

const mSTP = ({ Chat: { text, listComponent }}) => {
	return { text, listComponent }; 
}

export default connect(mSTP, { updateText })(Input);
