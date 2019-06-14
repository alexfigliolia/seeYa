import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';
import MapView from './Map';
import List from './List';
import ListStyles from './List/Styles';
import BaseStyles from '../Base/Styles';

class ProximityList extends Component {
  constructor(props) {
    super(props);
    this.anim = new Animated.Value(0);
    const { height, mapHeight, isX } = this.props;
    this.height = isX ? 
      {}
    : { height: height + mapHeight };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { height, mapHeight } = this.props;
    return (
      <View style={[ListStyles.container, { height }]}>
        <Animated.View style={[BaseStyles.center, ListStyles.list, { 
          transform: [
            { translateY: this.anim.interpolate({
              inputRange: [0, mapHeight],
              outputRange: [0, -mapHeight],
              extrapolate: 'clamp',
            })}
          ],
        }, this.height]}>
          <MapView anim={this.anim} />
          <List anim={this.anim} />
        </Animated.View>
      </View>
    );
  }
}

const mSTP = ({ Dimensions }) => {
  const { bodyHeight, mapHeight, isX } = Dimensions;
  return { height: bodyHeight, mapHeight, isX };
}

export default connect(mSTP)(ProximityList);