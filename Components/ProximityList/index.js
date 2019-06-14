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
          height: height + mapHeight,
        }]}>
          <MapView anim={this.anim} />
          <List anim={this.anim} />
        </Animated.View>
      </View>
    );
  }
}

const mSTP = ({ Dimensions }) => {
  const { bodyHeight, mapHeight } = Dimensions;
  return { height: bodyHeight, mapHeight };
}

export default connect(mSTP)(ProximityList);