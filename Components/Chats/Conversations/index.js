import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Conversation from './Conversation';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';

class Conversations extends Component {
	constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.initialNumToRender = this.initialNumToRender.bind(this);
  }

  shouldComponentUpdate({ conversations }) {
    return conversations.length !== this.props.conversations.length;
  }

	renderItem({ item, index }) {
		return (
			<Conversation 
				index={index}
				{...item}
        infoWidth={0} />
		);
	}

	keyExtractor({ name }, index) {
		return `${name}-${index}`;
	}

	getItemLayout(data, index) {
    return { length: 110, offset: 110 * index, index }
  }

  initialNumToRender() {
  	return Math.ceil(this.props.height/100);
  }

	render() {
		const { conversations } = this.props;
		return (
			<FlatList
        data={conversations}
        style={[BaseStyles.fillContainer, Styles.list]}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        getItemLayout={this.getItemLayout}
        initialNumToRender={this.initialNumToRender()}
        initialScrollIndex={0}
        removeClippedSubviews={conversations.length > 20}
        keyboardShouldPersistTaps='handled' />
		);
	}
}

const mSTP = ({ Dimensions: { bodyHeight }, Chat: { conversations }}) => {
	return { height: bodyHeight, conversations };
}

export default connect(mSTP)(Conversations);
