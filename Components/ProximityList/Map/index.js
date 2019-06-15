import React, { Component } from 'react';
import { Animated, View, PanResponder, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import MapView from './Mapview';
import PullTab from './PullTab';
import Styles from './Styles';
import BaseStyles from '../../Base/Styles';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.customSpring = {
      duration: 500,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleY,
        springDamping: 0.625,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.625,
      },
    };
    this.customLinear = {
      duration: 50,
      create: { 
        type: 'linear', 
        property: LayoutAnimation.Properties.scaleY 
      },
      update: { type: 'linear' },
    }
    const { headerHeight, mapHeight } = this.props;
    const startingHeight = headerHeight + mapHeight;
    this.startY = 0;
    this.distanceTraveled = 0;
    this.startingHeight = startingHeight;
    this.currentHeight = startingHeight;
    this.halfMapHeight = mapHeight/2;
    this.negativeMapHeight = -mapHeight;
    this.containerStyle = { height: mapHeight };
    this.state = { toggled: false };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: e => true,
      onStartShouldSetResponderCapture: e => true,
      onMoveShouldSetPanResponderCapture: e => true,
      onPanResponderGrant: this.onTouchStart,
      onPanResponderMove: this.onTouchMove,
      onPanResponderRelease: this.onTouchEnd
    });
  }

  shouldComponentUpdate(nextProps, { toggled }) {
    return toggled !== this.state.toggled;
  }

  clearTimer() {
    if(this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onTouchStart(e) {
    this.startY = e.nativeEvent.pageY;
    this.distanceTraveled = 0;
    this.startingHeight = this.currentHeight;
  }

  onTouchMove({ nativeEvent: { pageY }}) {
    if(pageY > this.props.headerHeight) {
      this.distanceTraveled = pageY - this.startY;
      this.updateHeight(
        this.startingHeight + this.distanceTraveled, 
        true, 
        false
      );
    }
  }

  onTouchEnd(e, { vy, dy }) {
    const { height, mapHeight } = this.props;
    if(
      Math.abs(this.distanceTraveled) >= 10 && 
      (Math.abs(vy) >= 0.5 || 
      Math.abs(dy) >= 0.3 * height)
    ) {
      const goingDown = this.distanceTraveled > 0;
      this.updateHeight(
        goingDown ? height - 10 : mapHeight, 
        true
      );
      this.setState({ toggled: goingDown });
    } else {
      this.updateHeight(
        this.state.toggled ? height - 10 : mapHeight, 
        true
      );
    }
  }

  updateHeight(height, setMap = false, animate = true) {
    if(animate) LayoutAnimation.configureNext(this.customSpring);
    else LayoutAnimation.configureNext(this.customLinear);
    this.currentHeight = height;
    this.container.setNativeProps({ height });
    if(setMap) this.map.setNativeProps({ height: height, transform: [{ translateY: 0 }] });
  }

  getTranslation(anim, input, output) {
    return { transform: [
      { translateY: anim.interpolate({
        inputRange: [0, input],
        outputRange: [0, output],
        extrapolate: 'clamp',
      })}
    ]};
  }

  getFade(anim, input) {
    return {
      opacity: anim.interpolate({
        inputRange: [0, input/2],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      })
    }
  }

  render() {
    const { mapHeight, anim } = this.props;
    const { toggled } = this.state;
    return (
      <Animated.View 
        ref={c => this.container = c}
        style={[
          BaseStyles.center, 
          Styles.map, 
          this.getTranslation(anim, mapHeight, this.negativeMapHeight), 
          this.containerStyle
        ]}>
      	<View
          ref={c => this.map = c} 
          style={[Styles.paralax, this.containerStyle]}>
           <Animated.View 
            style={[
              Styles.mapWrapper, 
              Styles.paralax,
              BaseStyles.fillContainer,
              this.getTranslation(anim, mapHeight, mapHeight)
            ]}>
            <MapView /> 
          </Animated.View> 
        </View>
        <PullTab 
          panHandlers={this.panResponder.panHandlers}
          toggled={toggled}
          animation={this.getFade(anim, mapHeight)} />
      </Animated.View>
    );
  }
}

const mSTP = ({ Dimensions }) => {
  const { bodyHeight, headerHeight, mapHeight } = Dimensions;
  return { height: bodyHeight, headerHeight, mapHeight };
}

export default connect(mSTP)(MapContainer);