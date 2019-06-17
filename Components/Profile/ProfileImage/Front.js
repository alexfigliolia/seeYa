import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { connect } from 'react-redux';
import Avatar from '../../Base/Avatar';
import RippleButton from '../../Base/RippleButton';
import Styles from '../Styles';
import BaseStyles from '../../Base/Styles';

class Front extends Component {
	constructor(props) {
	  super(props);
		this.onPress = this.onPress.bind(this);
	}

	shouldComponentUpdate({ visible, image }) {
		const curProps = this.props;
		if(visible !== curProps.visible) return true;
		else if(image !== curProps.image) return true;
		return false;
	}

	onPress() {
		setTimeout(this.props.flip, 250)
	}

	render() {
		const { 
			dims, 
			image, 
			borderRadius, 
			anim, 
			flip,
			visible
		} = this.props;
		return (
			<Animated.View style={[Styles.front, {
				transform: [
					{ rotateY: anim.interpolate({
						inputRange: [0, 1],
						outputRange: ['0deg', '180deg']
					})},
					{ perspective: 500 }
				],
				height: dims,
				width: dims,
				borderRadius,
			}]}
			pointerEvents={visible ? 'auto' : 'none'}>
				<View style={[BaseStyles.fillContainer, { 
					overflow: 'hidden', 
					borderRadius 
				}]}>
					<RippleButton 
						onPress={this.onPress}
						raised={false}
						width={dims}
						height={dims}
						rippleStyle={Styles.ripple}>
						<Avatar 
							image={image}
							style={{
								height: dims,
								width: dims,
								borderRadius: borderRadius,
							}} />
					</RippleButton>
				</View>
			</Animated.View>
		);
	}
}

const mSTP = ({ User: { image }}) => {
	return { image };
}

export default connect(mSTP)(Front);
