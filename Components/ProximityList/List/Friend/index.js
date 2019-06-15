import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux'; 
import GestureItem from '../../../Base/GestureItem';
import Avatar from '../../../Base/Avatar';
import UserName from '../../../Base/UserName';
import Distance from '../../../Base/Distance';
import Location from '../../../../public/location.png';
import Styles from '../Styles';
import BaseStyles from '../../../Base/Styles';
import ListItemStyles from '../../../Base/ListItem/Styles';
const { center, fillContainer } = BaseStyles; 

class Friend extends Component {

	shouldComponentUpdate({ distance, name, image }) {
		const curProps = this.props;
		if(distance !== curProps.distance) return true;
		else if(name !== curProps.name) return true;
		else if(image !== curProps.image) return true;
		return false;
	}

	render() {
		const { distance, name, index, length, listItemInfoWidth, image } = this.props;
		return (
			<GestureItem index={index}>
				<View 
					style={[fillContainer, center, Styles.friendCenter]}>
					<Avatar image={image} />
					<View style={[ListItemStyles.infoMargin, { width: listItemInfoWidth }]}>
						<UserName name={name} />
						<Distance distance={distance} />
					</View>
				</View>
			</GestureItem>
		);
	}
}

const mSTP = ({ Proximity, Dimensions }, { index }) => {
	const { searchResults } = Proximity;
	const { listItemInfoWidth } = Dimensions;
	if(typeof searchResults[index] === 'object') return { distance: searchResults[index].distance, listItemInfoWidth };
	return { distance: 0, listItemInfoWidth }
}

export default connect(mSTP)(Friend);
