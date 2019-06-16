import React, { Component } from 'react';
import { KeyboardAvoidingView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Message from './Message';
import Styles from './Styles';
import BaseStyles from '../../../Base/Styles';

class Messages extends Component {
	constructor(props) {
    super(props);
    this.length = this.props.messages.length;
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
  }

  componentDidMount() {
  	this.list.scrollToEnd({ animated: false });
  }

  shouldComponentUpdate(nextProps) {
  	const { length } = nextProps.messages; 
  	if(length !== this.props.messages.length) {
  		this.length = length;
  		return true;
  	}
  	return false;
  }

  componentDidUpdate(prevProps, prevState) {
  	this.list.scrollToIndex({ index: 0, animated: true });
  }

	renderItem({ item, index }) {
		return (
			<Message
				index={index}
				length={this.length}
				{...item} />
		);
	}

	keyExtractor({ id }, index) {
		return id.toString();
	}

  initialNumToRender() {
  	return Math.ceil(this.props.height/50);
  }

	render() {
		const { messages } = this.props;
		return (
			<KeyboardAvoidingView 
				style={Styles.container}
				behavior='height'
				enabled
				//headerHeight + chatHeaderHeight
				keyboardVerticalOffset={90}>
				<FlatList
					ref={c => this.list = c}
	        data={messages}
	        renderItem={this.renderItem}
	        keyExtractor={this.keyExtractor}
	        initialNumToRender={this.initialNumToRender()}
	        initialScrollIndex={0}
	        inverted={true}
	        removeClippedSubviews={messages.length > 20}
	        keyboardShouldPersistTaps='handled' />
			</KeyboardAvoidingView>
		);
	}
}

const mSTP = ({ Chat, Dimensions }) => {
	const { height } = Dimensions;
	const { messages } = Chat;
	return { messages, height };
}

export default connect(mSTP)(Messages);
