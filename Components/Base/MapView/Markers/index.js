import React, { PureComponent, Fragment } from 'react';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import FriendMarker from './FriendMarker';
import UserMarker from './UserMarker';

class Markers extends PureComponent {
	render() {
		return (
			<Fragment>
				<UserMarker />
				{
          this.props.searchResults
          	.filter(({ distance }, i) => distance < 5280)
          	.map((friend, i) => {
	            const { name, latitude, longitude, image } = friend;
	            return (
	              <Marker
	                key={`${name}:${i}`}
	                coordinate={{ latitude, longitude }}
	                title={name}
	                style={{ overflow: 'visible' }}
	                tracksViewChanges={true}>
	                <FriendMarker 
	                  index={i}
	                  image={image ? { uri: image } : require('../../../../public/user.png')} />
	              </Marker>
	            );
	          })
        }
			</Fragment>
		);
	}
}

const mSTP = ({ Proximity: { searchResults }}) => {
	return { searchResults };
}

export default connect(mSTP)(Markers);
