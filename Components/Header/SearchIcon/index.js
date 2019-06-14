import React, { Component } from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { search } from '../../../Actions/Header';
import Circle from './Circle';
import Handle from './Handle';
import Ex from './Ex';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';
const { center, fillContainer } = BaseStyles; 

class SearchIcon extends Component {
	constructor(props) {
	  super(props);
		this.anim = new Animated.Value(0);
	}

	shouldComponentUpdate() {
		return false;
	}

	UNSAFE_componentWillReceiveProps({ searching }) {
		if(searching !== this.props.searching) this.change(searching);
	}

	change(color) {
		Animated.timing(this.anim, {
			toValue: color ? 1 : 0,
			duration: 500
		}).start();
	}

	render() {
		const { dims, onPress, search, iconHeight } = this.props;
		const stickHeight = iconHeight/2;
		const stickWidth = stickHeight/4;
		const stickBorderRadius = stickWidth/2;
		return (
			<Animated.View style={[Styles.searchContainer, center, {
				height: dims
			}]}>
				<TouchableOpacity 
					style={[center, fillContainer, Styles.searchIconButton]}
					onPress={search}>
					<View style={[center, fillContainer]}>
						<Circle  
							dims={iconHeight}
							xWidth={stickWidth} />
						<Handle
							height={stickHeight}
							width={stickWidth}
							borderRadius={stickBorderRadius}
							dims={iconHeight} />
						<Ex
							height={stickHeight}
							width={stickWidth}
							borderRadius={stickBorderRadius}
							dims={iconHeight} />
					</View>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const mSTP = ({ Dimensions: { headerHeight }, Header: { searching }}) => {
	return { headerHeight, searching };
}

export default connect(mSTP, { search })(SearchIcon);