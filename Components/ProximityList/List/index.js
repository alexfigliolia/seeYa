import React, { PureComponent } from 'react';
import { Animated, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Skeleton from './Skeleton';
import Friend from './Friend';
import Styles from './Styles';
import BaseStyles from '../../Base/Styles';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class List extends PureComponent {
  constructor(props) {
    super(props);
    const { height, mapHeight, isX } = this.props;
    this.height = isX ? { height } : {};
    this.listHeight = height - mapHeight;
    this.state = { refreshing: false, hasFriends: false };
    this.refresh = this.refresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.getItemLayout = this.getItemLayout.bind(this);
    this.initialNumToRender = this.initialNumToRender.bind(this);
    this.showList = this.showList.bind(this);
  }

  renderItem({ item, index }) {
    return (
      <Friend 
        index={index}
        {...item} />
    );
  }

  keyExtractor({ name }, index) {
    return `${name}-${index}`;
  }

  getItemLayout(data, index) {
    return { length: 110, offset: 110 * index, index }
  }

  initialNumToRender() {
    return Math.ceil(this.listHeight/100);
  }

  refresh() {
    this.setState({refreshing: true}, () => {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 2500);
    });
  }

  showList() {
    this.setState({ hasFriends: true });
  }

  render() {
    const { searchResults, anim, mapHeight } = this.props;
    const { hasFriends, refreshing } = this.state;
    return hasFriends ? 
      <AnimatedFlatList
        data={searchResults}
        style={[
          BaseStyles.fillContainer, 
          Styles.list, 
          this.height,
          Styles.listSpacing
        ]}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        getItemLayout={this.getItemLayout}
        initialNumToRender={this.initialNumToRender()}
        initialScrollIndex={0}
        removeClippedSubviews={searchResults.length > 20}
        keyboardShouldPersistTaps='handled'
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: anim}}}],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.refresh}
            colors={['#FD5E29', '#FC1F2F', '#FC3F90']}
            tintColor='#FC252A'
            titleColor='#E47D2F'
            progressViewOffset={10}
            title='Finding your friends...' />
        } />
      : <Skeleton
          numChildren={this.initialNumToRender()}
          showList={this.showList} />
  }
}

const mSTP = ({ Proximity, Dimensions }) => {
  const { bodyHeight, mapHeight, isX } = Dimensions;
  const { searchResults } = Proximity;
  return { height: bodyHeight, mapHeight, searchResults, isX };
}

export default connect(mSTP)(List);
