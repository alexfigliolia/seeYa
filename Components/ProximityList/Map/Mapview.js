import React, { Component } from 'react';
import { Animated } from 'react-native';
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { showMarkers } from '../../../Actions/Proximity';
import Markers from './Markers';
import BaseStyles from '../../Base/Styles';
const { center, fillContainer } = BaseStyles;

class Mapview extends Component {
	constructor(props) {
    super(props);
    this.opacity = new Animated.Value(0);
    this.numRenders = 0;
    this.region = null;
    this.visible = false;
  }

  componentDidMount() {
    const { latitude, longitude } = this.props;
    if(latitude && longitude) this.makeVisible(() => this.focus(latitude, longitude));
  }

  shouldComponentUpdate({ latitude, longitude, error }) {
    const curProps = this.props;
    if(latitude !== curProps.latitude && this.numRenders < 2) return true;
    else if(longitude !== curProps.longitude && this.numRenders < 2) return true;
    if(error !== curProps.error) return true;
    return false;
  }

  componentDidUpdate({ latitude: prevLat, longitude: prevLong}) {
    const { latitude, longitude } = this.props;
    if(latitude !== prevLat || longitude !== prevLong) {
      if(!this.visible) this.makeVisible(() => this.focus(latitude, longitude));
      else this.focus(latitude, longitude);
    }
  }

  getFirstRegion(latitude, longitude) {
    this.region = new AnimatedRegion({
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    return this.region;
  }

  makeVisible(cb) {
    this.visible = true;
    Animated.timing(this.opacity, {
      toValue: 1, duration: 500, useNativeDriver: true
    }).start(() => {
      if(cb) cb();
    });
  }

  focus(latitude, longitude) {
    this.region.timing({
      latitude,
      longitude,
      latitudeDelta: 0.009, 
      longitudeDelta: 0.009,
      duration: 1000,
    }).start(this.props.showMarkers);
  }

	render() {
		const { latitude, longitude, error } = this.props;
		if(!latitude || !longitude) return false;
    this.numRenders++;
		return (
			<Animated.View style={[fillContainer, {
        opacity: this.opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        }),
        overflow: 'hidden'
      }]}>
        <MapView.Animated
          ref={c => (this.mapView = c)}
          provider={PROVIDER_GOOGLE}
          style={fillContainer}
          mapType="standard"
          region={this.numRenders > 1 ? this.region : this.getFirstRegion(latitude, longitude)}>
          <Markers />
        </MapView.Animated> 
      </Animated.View>
		); 
	}
}

const mSTP = ({ Proximity: { latitude, longitude, error }}) => {
  return { latitude, longitude, error };
}

export default connect(mSTP, { showMarkers })(Mapview);
