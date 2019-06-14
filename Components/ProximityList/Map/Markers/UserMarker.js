import React, { Component } from 'react';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

class UserMarker extends Component {

	shouldComponentUpdate({ latitude, longitude }) {
    const curProps = this.props;
    if(latitude !== curProps.latitude) return true;
    else if(longitude !== curProps.longitude) return true;
    return false;
  }

  render() {
  	const { latitude, longitude } = this.props;
    return latitude && longitude ? (
      <Marker
        coordinate={{ latitude, longitude }}
        title="Me"
        pinColor='#FC315D'
        zIndex={5} />
    ) : null;
  }
}

const mSTP = ({ Proximity: { latitude, longitude }}) => {
	return { latitude, longitude };
}

export default connect(mSTP)(UserMarker);