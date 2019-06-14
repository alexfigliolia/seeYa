import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Conversation from './Conversation';
import Styles from './Styles';
import BaseStyles from '../Base/Styles';
const { container, fillContainer } = BaseStyles;

class Chat extends Component {
	constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.initialNumToRender = this.initialNumToRender.bind(this);
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

  initialNumToRender(height) {
  	return Math.ceil(height/100);
  }

	render() {
		const { bodyHeight, conversations } = this.props;
		return (
			<View style={[container, Styles.container, { 
				height: bodyHeight,
			}]}>
				<FlatList
          data={conversations}
          style={[fillContainer, Styles.list]}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          getItemLayout={this.getItemLayout}
          initialNumToRender={this.initialNumToRender(bodyHeight)}
          initialScrollIndex={0}
          removeClippedSubviews={conversations.length > 20}
          keyboardShouldPersistTaps='handled' />
			</View>
		);
	}
}

const mSTP = ({ Dimensions: { bodyHeight }, Chat: { conversations }}) => {
	return { bodyHeight, conversations };
}

export default connect(mSTP)(Chat);
